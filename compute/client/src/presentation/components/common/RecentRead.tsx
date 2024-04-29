import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Measurement } from "@/domain/model/Measurement";
import { useGlobalContext } from "@/context";

const RecentRead = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [measurementLength, setMeasurementLength] = useState<number>(0);

  const { measurementsActual } = useGlobalContext();

  const getMeasurementsToday = async () => {
    try {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const { data } = await axios.get("/api/getMeasurements", {
        params: { dateFrom: now, dateTo: undefined },
      });
      setMeasurements(data.measurements);
      setMeasurementLength(data.measurements.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMeasurementsToday();
  }, []);

  useEffect(() => {
    if (measurementsActual) {
      setMeasurements((prev) => [...prev, measurementsActual]);
      setMeasurementLength((prev) => prev + 1);
    }
  }, [measurementsActual]);

  function formatDate(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Datos recibidos el día de hoy</CardTitle>
        <CardDescription>{`Se han recibido ${measurementLength} reportes`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {measurements
            .slice(-5)
            .reverse()
            .map((measurement) => (
              <div className="flex items-center" key={measurement._id}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {measurement.hostname.toLocaleUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(measurement.createdAt.toString())}
                  </p>
                </div>
                <div className="ml-auto font-medium">{measurement.value}</div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRead;
