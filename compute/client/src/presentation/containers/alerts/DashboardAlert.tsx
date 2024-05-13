"use client";

import React, { useState, useEffect } from "react";
import { Alert } from "@/domain/model/Alert";
import axios from "axios";
import { useGlobalContext } from "@/context";
import DataTable from "@/presentation/components/common/data-table";

interface DashboardAlertProps {
  onUpdateAlerts: (val: boolean) => void;
}

const DashboardAlert: React.FC<DashboardAlertProps> = ({ onUpdateAlerts }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const { newAlert } = useGlobalContext();

  const getAlerts = async () => {
    try {
      const { data } = await axios.get("/api/alerts/getAlerts");
      setAlerts(data.alerts);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewAlert = () => {
    if (newAlert) {
      setAlerts((prev) => [...prev, newAlert]);
    }
  };

  useEffect(() => {
    addNewAlert();
  }, [newAlert]);

  useEffect(() => {
    getAlerts();
  }, []);

  const removAlert = async (obj: any) => {
    try {
      const id = obj.timestamp;
      await axios.delete(`/api/alerts/${id}`);
      getAlerts();
      onUpdateAlerts(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <DataTable
        data={alerts}
        order={"type"}
        search={"hostname"}
        noView={["_id"]}
        onDelete={true}
        remove={(obj) => removAlert(obj)}
      />
    </div>
  );
};

export default DashboardAlert;
