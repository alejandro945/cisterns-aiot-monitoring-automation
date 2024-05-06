import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import axios from "axios";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";

const CardDevicesActive = () => {
  const [devices, setDevices] = useState<number>(0);

  const getCountDevicesActive = async () => {
    try {
      const { data } = await axios.get("/api/device/getCountDevices", {
        params: { active: "true" },
      });
      setDevices(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountDevicesActive();
  }, []);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {DASHBOARD_PAGE.cardDevicesActive.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{devices}</div>
        <p className="text-xs text-muted-foreground">
          {DASHBOARD_PAGE.cardDevicesActive.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardDevicesActive;
