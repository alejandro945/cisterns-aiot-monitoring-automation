"use client";

import { Overview } from "@/presentation/components/common/bar";
import { CalendarDateRangePicker } from "@/presentation/components/common/data-range-picker";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";
import CardDevices from "@/presentation/containers/devices/CardDevices";
import CardDevicesActive from "@/presentation/containers/devices/CardDevicesActive";
import RecentRead from "@/presentation/components/common/RecentRead";
import React, { useState } from "react";
import ModalAlerts from "@/presentation/containers/alerts/ModalAlerts";
import axios from "axios";
import { useEffect } from "react";

interface AlertsCount {
  _id: string;
  count: number;
}

const DashboardPage = () => {
  const [doFilter, setDoFilter] = useState<boolean>(false);
  const [getExcel, setGetExcel] = useState<boolean>(false);

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
    console.log("useEffect DashboardPage");
    getAlerts();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-2 sm:p-8 pt-6">
      {/* Title And Filters */}
      <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          {DASHBOARD_PAGE.title}
        </h2>
        <div className="flex flex-col w-full items-center justify-center gap-2 sm:flex-row md:justify-end">
          <Button
            className="w-full sm:w-auto"
            onClick={() => setGetExcel(true)}
          >
            {DASHBOARD_PAGE.excel}
          </Button>
          <CalendarDateRangePicker />
          <Button
            className="w-full sm:w-auto"
            onClick={() => setDoFilter(true)}
          >
            {DASHBOARD_PAGE.filter}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CardDevices />
        <CardDevicesActive />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalAlerts()}</div>
            <p className="text-xs text-muted-foreground">El día de hoy</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Consumo de Agua</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview
              doFilter={doFilter}
              setDoFilter={setDoFilter}
              getExcel={getExcel}
              setGetExcel={setGetExcel}
            />
          </CardContent>
        </Card>
        <RecentRead />
      </div>
    </div>
  );
};

export default DashboardPage;
