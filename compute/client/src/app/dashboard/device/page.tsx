"use client";

import { Title } from "@/presentation/components/common/title";
import { DEVICES_PAGE } from "@/presentation/constants/devices.constants";
import DashboardDevices from "@/presentation/containers/devices/DashboardDevices";
import React from "react";

const DevicePage = () => {
  return (
    <div className="px-24 mt-5">
      <Title
        mainTitle={DEVICES_PAGE.title}
        description={DEVICES_PAGE.description}
      />
      <DashboardDevices />
    </div>
  );
};

export default DevicePage;
