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
import CardDevices from "@/presentation/containers/dashboard/CardDevices";
import CardDevicesActive from "@/presentation/containers/dashboard/CardDevicesActive";
import RecentRead from "@/presentation/containers/dashboard/RecentRead";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useGlobalContext } from "@/context";
import { Measurement } from "@/domain/model/Measurement";
import ExcelJS from "exceljs";
import CardAlerts from "@/presentation/containers/dashboard/CardAlerts";

const DashboardPage = () => {
  const [doFilter, setDoFilter] = useState<boolean>(false);
  const [getExcel, setGetExcel] = useState<boolean>(false);

  const { measurements } = useGlobalContext();

  const onClickHandleExcel = (data: Measurement[]) => {
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

  return (
    <div className="flex-1 space-y-4 p-2 sm:p-8 pt-6">
      <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          {DASHBOARD_PAGE.title}
        </h2>
        <div className="flex flex-col w-full items-center justify-center gap-2 sm:flex-row md:justify-end">
          <Button
            className="w-full sm:w-auto"
            onClick={() => onClickHandleExcel(measurements)}
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
        <CardAlerts />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>{DASHBOARD_PAGE.cardWaterConsumption.title}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview doFilter={doFilter} setDoFilter={setDoFilter} />
          </CardContent>
        </Card>
        <RecentRead />
      </div>
    </div>
  );
};

export default DashboardPage;
