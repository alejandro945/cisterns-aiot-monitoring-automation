"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useToast } from "../ui/use-toast";
import { Measurement } from "@/domain/model/Measurement";
import { useGlobalContext } from "@/context";
import ExcelJS from "exceljs";
import axios from "axios";

interface OverviewProps {
  doFilter: boolean;
  setDoFilter: React.Dispatch<React.SetStateAction<boolean>>;
  getExcel: boolean;
  setGetExcel: React.Dispatch<React.SetStateAction<boolean>>;
}

type DataGraph = {
  name: string;
  m3: number;
};

export function Overview({
  doFilter,
  setDoFilter,
  getExcel,
  setGetExcel,
}: OverviewProps) {
  const [sseConnection, setSSEConnection] = useState<EventSource | null>(null);
  const [dataGraph, setDataGraph] = useState<DataGraph[]>([]);
  const {
    measurements,
    setMeasurements,
    dateRange,
    setMeasurementsActual,
    setNewAlert,
  } = useGlobalContext();

  const { toast } = useToast();

  const listenToSSEUpdates = useCallback(() => {
    console.log("listenToSSEUpdates func");
    const eventSource = new EventSource("/api/sse");

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    eventSource.addEventListener("measurement", (e) => {
      if (JSON.parse(e.data)?.operationType === "insert") {
        const data = JSON.parse(e.data)?.fullDocument;
        if (data) {
          setMeasurementsActual(data);
          const sameDayV = sameDay(
            dateRange?.from?.toISOString(),
            dateRange?.to?.toISOString(),
            data.createdAt.toString()
          );

          if (sameDayV) {
            setMeasurements((prevMeasurements) => {
              const updatedMeasurements = [...prevMeasurements, data];
              handleDataMeasurements(updatedMeasurements);
              return updatedMeasurements;
            });
          }
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
  }, [dateRange?.from, dateRange?.to]);

  const sameDay = (
    from: string | undefined,
    to: string | undefined,
    today: string
  ) => {
    const fromDay = new Date(from || "");
    const todayDay = new Date(today);
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
    listenToSSEUpdates();
    return () => {
      if (sseConnection) {
        sseConnection.close();
      }
    };
  }, [listenToSSEUpdates]);

  const getMeasurements = async () => {
    try {
      const { data } = await axios.get("/api/getMeasurements", {
        params: { dateFrom: dateRange?.from, dateTo: dateRange?.to },
      });
      setMeasurements(data.measurements);
      handleDataMeasurements(data.measurements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMeasurements();
  }, []);

  useEffect(() => {
    if (doFilter) {
      getMeasurements();
      setDoFilter(false);
    }
  }, [doFilter]);

  const handleExcel = (data: Measurement[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.addRow(Object.keys(data[0]));
    data.forEach((measurement) => {
      worksheet.addRow(Object.values(measurement));
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "DataMeasurement.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    if (getExcel) {
      handleExcel(measurements);
      setGetExcel(false);
    }
  }, [getExcel]);

  const handleDataMeasurements = (dataMeasurement: Measurement[]) => {
    console.log("handleDataMeasurements func");

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

  return (
    <>
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
              value: "Metros cubicos",
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
    </>
  );
}
