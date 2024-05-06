import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import DashboardAlert from "./DashboardAlert";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/context";

interface AlertsCount {
  _id: string;
  count: number;
}

const ModalAlerts = () => {
  const [alerts, setAlerts] = useState<AlertsCount[]>([]);
  const { newAlert, setNewAlert } = useGlobalContext();

  const getAlertsAmount = async () => {
    try {
      const { data } = await axios.get("/api/alerts/getAmountAlerts");
      console.log(data);
      setAlerts(data.amountAlerts);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewAlert = () => {
    if (newAlert) {
      setAlerts((prev) => {
        const index = prev.findIndex((alert) => alert._id === newAlert.type);
        if (index !== -1) {
          prev[index].count++;
          return [...prev];
        }
        return [...prev, { _id: newAlert.type, count: 1 }];
      });
    }
  };

  useEffect(() => {
    addNewAlert();
  }, [newAlert]);

  useEffect(() => {
    getAlertsAmount();
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-row gap-2">
        <ResponsiveContainer
          width="80%"
          height={350}
          style={{ margin: "auto" }}
        >
          <BarChart width={730} height={250} data={alerts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Cantidad de Alertas",
                angle: -90,
              }}
            />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModalAlerts;
