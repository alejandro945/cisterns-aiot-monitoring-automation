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

interface AlertsCount {
  _id: string;
  count: number;
}

const ModalAlerts = () => {
  const [alerts, setAlerts] = useState<AlertsCount[]>([]);

  const getAlertsAmount = async () => {
    try {
      const { data } = await axios.get("/api/alerts/getAmountAlerts");
      setAlerts(data.amountAlerts);
    } catch (error) {
      console.error(error);
    }
  };

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
