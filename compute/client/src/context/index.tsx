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

interface ContextProps {
  measurements: Measurement[];
  setMeasurements: Dispatch<SetStateAction<Measurement[]>>;
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  measurementsActual: Measurement | undefined;
  setMeasurementsActual: Dispatch<SetStateAction<Measurement | undefined>>;
}

const GlobalContext = createContext<ContextProps>({
  measurements: [],
  setMeasurements: (): Measurement[] => [],
  dateRange: undefined,
  setDateRange: (): DateRange | undefined => undefined,
  measurementsActual: undefined,
  setMeasurementsActual: (): Measurement | undefined => undefined,
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

  return (
    <GlobalContext.Provider
      value={{
        measurements,
        setMeasurements,
        dateRange,
        setDateRange,
        measurementsActual,
        setMeasurementsActual,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
