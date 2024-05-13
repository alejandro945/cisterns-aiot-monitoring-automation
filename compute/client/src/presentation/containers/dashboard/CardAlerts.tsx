import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import axios from "axios";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";
import { useGlobalContext } from "@/context";

interface AlertsCount {
  _id: string;
  count: number;
}

const CardAlerts = () => {
  const { newAlert } = useGlobalContext();

  const [alerts, setAlerts] = useState<AlertsCount[]>([]);
  const getAlerts = async () => {
    try {
      const { data } = await axios.get("/api/alerts/getAmountAlerts");
      setAlerts(data.amountAlerts);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalAlerts = () => {
    return alerts.reduce((acc, curr) => acc + curr.count, 0);
  };

  useEffect(() => {
    getAlerts();
  }, [newAlert]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {DASHBOARD_PAGE.cardAlerts.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{getTotalAlerts()}</div>
        <p className="text-xs text-muted-foreground">
          {DASHBOARD_PAGE.cardAlerts.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardAlerts;
