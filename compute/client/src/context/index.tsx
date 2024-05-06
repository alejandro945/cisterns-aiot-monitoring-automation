"use client";

import { Measurement } from "@/domain/model/Measurement";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import { Alert } from "@/domain/model/Alert";

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
