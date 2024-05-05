"use client";

import { Title } from "@/presentation/components/common/title";
import DashboardAlert from "@/presentation/containers/alerts/DashboardAlert";
import ModalAlerts from "@/presentation/containers/alerts/ModalAlerts";
import React from "react";

const AlertPage = () => {
  return (
    <div className="flex flex-col gap-5 px-24 mt-5">
      <Title
        mainTitle="Alertas"
        description="A continuación podras ver las alarmas que se han generado"
      />
      <ModalAlerts />
      <DashboardAlert />
    </div>
  );
};

export default AlertPage;
