"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Measurement } from "@/domain/model/Measurement";
import { useGlobalContext } from "@/context";
import axios from "axios";
import { useToast } from "@/presentation/components/ui/use-toast";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";

interface OverviewProps {
  doFilter: boolean;
  setDoFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

type DataGraph = {
  name: string;
  m3: number;
};

export function Overview({ doFilter, setDoFilter }: OverviewProps) {
  const [dataGraph, setDataGraph] = useState<DataGraph[]>([]);
  const { measurements, setMeasurements, dateRange } = useGlobalContext();

  const { toast } = useToast();

  const getMeasurements = async () => {
    try {
      const { data } = await axios.get("/api/measurements/getMeasurements", {
        params: { dateFrom: dateRange?.from, dateTo: dateRange?.to },
      });
      setMeasurements(data.measurements);
      handleDataMeasurements(data.measurements);
    } catch (error) {
      toast({
        title: "Error",
        description: `Error to get measurements: ${error}`,
      });
    }
  };

  useEffect(() => {
    getMeasurements();
    if (doFilter) {
      setDoFilter(false);
    }
  }, [doFilter]);

  const handleDataMeasurements = (dataMeasurement: Measurement[]) => {
    const measurementsByDevice: { [key: string]: Measurement[] } = {};

    dataMeasurement.forEach((measurement) => {
      if (!measurementsByDevice[measurement.hostname]) {
        measurementsByDevice[measurement.hostname] = [];
      }
      measurementsByDevice[measurement.hostname].push(measurement);
    });

    const data = Object.keys(measurementsByDevice).map((hostname) => {
      const deviceMeasurements = measurementsByDevice[hostname];
      const firstRecord = deviceMeasurements[0];
      const lastRecord = deviceMeasurements[deviceMeasurements.length - 1];
      const difference = lastRecord.value - firstRecord.value;

      return {
        name: hostname,
        m3: difference,
      };
    });
    setDataGraph(data);
  };

  useEffect(() => {
    handleDataMeasurements(measurements);
  }, [measurements]);

  return (
    <>
      {dataGraph.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart width={730} height={250} data={dataGraph}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: DASHBOARD_PAGE.cardWaterConsumption.label,
                angle: -90,
              }}
            />
            <Tooltip />
            <Bar
              dataKey="m3"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-sm mt-5">
          {DASHBOARD_PAGE.cardWaterConsumption.noData}
        </div>
      )}
    </>
  );
}
