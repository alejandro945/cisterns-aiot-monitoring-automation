import React, { useState, useEffect } from "react";
import { Device } from "@/domain/model/Device";
import axios from "axios";
import DataTable from "@/presentation/components/common/data-table";

const DashboardDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  const getDevices = async () => {
    try {
      const { data } = await axios.get("/api/device/getDevices");
      setDevices(data.devices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      <DataTable
        data={devices}
        order={"ip"}
        search={"hostname"}
        noView={["_id"]}
        onDelete={false}
      />
    </div>
  );
};

export default DashboardDevices;
