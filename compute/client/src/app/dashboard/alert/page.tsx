"use client";

import { Title } from "@/presentation/components/common/title";
import { ALERTS_PAGE } from "@/presentation/constants/alerts.constants";
import DashboardAlert from "@/presentation/containers/alerts/DashboardAlert";
import ModalAlerts from "@/presentation/containers/alerts/ModalAlerts";
import React, { useState } from "react";

const AlertPage = () => {
  const [updateAlerts, setUpdateAlerts] = useState<boolean>(false);

  const onUpdateAlerts = (val: boolean) => {
    setUpdateAlerts(val);
  };

  return (
    <div className="flex flex-col gap-5 px-24 mt-5">
      <Title
        mainTitle={ALERTS_PAGE.title}
        description={ALERTS_PAGE.description}
      />
      <ModalAlerts
        updateAlerts={updateAlerts}
        onUpdateAlerts={onUpdateAlerts}
      />
      <DashboardAlert onUpdateAlerts={onUpdateAlerts} />
    </div>
  );
};

export default AlertPage;
