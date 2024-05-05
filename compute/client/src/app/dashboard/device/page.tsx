"use client";

import { Title } from "@/presentation/components/common/title";
import DashboardDevices from "@/presentation/containers/devices/DashboardDevices";
import React from "react";

const DevicePage = () => {
  return (
    <div className="px-24 mt-5">
      <Title
        mainTitle="Dispositivos"
        description="A continuación veras todos los dispositivos conectados"
      />
      <DashboardDevices />
    </div>
  );
};

export default DevicePage;
