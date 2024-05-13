"use client";

import { Measurement } from "@/domain/model/Measurement";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useEffect,
} from "react";
import { DateRange } from "react-day-picker";
import { Alert } from "@/domain/model/Alert";
import { useToast } from "@/presentation/components/ui/use-toast";

interface ContextProps {
  measurements: Measurement[];
  setMeasurements: Dispatch<SetStateAction<Measurement[]>>;
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  measurementsActual: Measurement | undefined;
  setMeasurementsActual: Dispatch<SetStateAction<Measurement | undefined>>;
  newAlert: Alert | undefined;
  setNewAlert: Dispatch<SetStateAction<Alert | undefined>>;
}

const GlobalContext = createContext<ContextProps>({
  measurements: [],
  setMeasurements: (): Measurement[] => [],
  dateRange: undefined,
  setDateRange: (): DateRange | undefined => undefined,
  measurementsActual: undefined,
  setMeasurementsActual: (): Measurement | undefined => undefined,
  newAlert: undefined,
  setNewAlert: (): Alert | undefined => undefined,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();

  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: now,
    to: undefined,
  });

  const [measurementsActual, setMeasurementsActual] = useState<
    Measurement | undefined
  >(undefined);

  const [newAlert, setNewAlert] = useState<Alert | undefined>(undefined);

  const [sseConnection, setSSEConnection] = useState<EventSource | null>(null);

  const listenToSSEUpdates = useCallback(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    eventSource.addEventListener("measurement", (e) => {
      if (JSON.parse(e.data)?.operationType === "insert") {
        const data = JSON.parse(e.data)?.fullDocument;
        if (data) {
          setMeasurementsActual(data);
          toast({
            title: "New Measurement",
            description: `Register with id: ${data._id} and value ${data.value}`,
          });
        }
      }
    });

    eventSource.addEventListener("alert", (e) => {
      const data = JSON.parse(e.data)?.fullDocument;
      if (data) {
        setNewAlert(data);
        toast({
          title: "New Alert",
          description: `In the device ${data.hostname} and type ${data.type}`,
          type: "background",
        });
      }
    });

    eventSource.onerror = (event) => {
      console.error("SSE Error:", event);
    };

    setSSEConnection(eventSource);

    return eventSource;
  }, []);

  const sameDay = (
    from: string | undefined,
    to: string | undefined,
    today: string | undefined
  ) => {
    const fromDay = new Date(from || "");
    const todayDay = new Date(today || "");
    if (to) {
      const toDay = new Date(to);
      return (
        toDay.getFullYear() >= todayDay.getFullYear() &&
        toDay.getMonth() >= todayDay.getMonth() &&
        toDay.getDate() >= todayDay.getDate() &&
        fromDay.getFullYear() <= todayDay.getFullYear() &&
        fromDay.getMonth() <= todayDay.getMonth() &&
        fromDay.getDate() <= todayDay.getDate()
      );
    } else {
      return (
        fromDay.getFullYear() === todayDay.getFullYear() &&
        fromDay.getMonth() === todayDay.getMonth() &&
        fromDay.getDate() === todayDay.getDate()
      );
    }
  };

  useEffect(() => {
    if (measurementsActual) {
      const sameDayV = sameDay(
        dateRange?.from?.toISOString(),
        dateRange?.to?.toISOString(),
        measurementsActual?.createdAt.toString()
      );
      if (sameDayV) {
        setMeasurements((prevMeasurements) => {
          const updatedMeasurements = [...prevMeasurements, measurementsActual];
          return updatedMeasurements;
        });
      }
    }
  }, [measurementsActual]);

  useEffect(() => {
    listenToSSEUpdates();
    return () => {
      if (sseConnection) {
        sseConnection.close();
      }
    };
  }, [listenToSSEUpdates]);

  return (
    <GlobalContext.Provider
      value={{
        measurements,
        setMeasurements,
        dateRange,
        setDateRange,
        measurementsActual,
        setMeasurementsActual,
        newAlert,
        setNewAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
