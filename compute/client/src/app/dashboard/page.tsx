"use client";

import { Overview } from "@/presentation/components/common/bar";
import { CalendarDateRangePicker } from "@/presentation/components/common/data-range-picker";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";
import CardDevices from "@/presentation/containers/devices/CardDevices";
import CardDevicesActive from "@/presentation/containers/devices/CardDevicesActive";
import RecentRead from "@/presentation/components/common/RecentRead";
import React, { useState } from "react";

const DashboardPage = () => {
  const [doFilter, setDoFilter] = useState<boolean>(false);
  return (
    <div className="flex-1 space-y-4 p-2 sm:p-8 pt-6">
      {/* Title And Filters */}
      <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          {DASHBOARD_PAGE.title}
        </h2>
        <div className="flex flex-col w-full items-center justify-center gap-2 sm:flex-row md:justify-end">
          {/* <CisternsSelect groups={groups} /> */}
          <CalendarDateRangePicker />
          <Button
            className="w-full sm:w-auto"
            onClick={() => setDoFilter(true)}
          >
            {DASHBOARD_PAGE.filter}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardDevices />
        <CardDevicesActive />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Alertas
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">El día de hoy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Activas
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">No se han revisado</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Consumo de Agua</CardTitle>
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
