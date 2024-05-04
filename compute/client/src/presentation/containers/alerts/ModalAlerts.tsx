import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
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

interface AlertsCount {
  _id: string;
  count: number;
}

interface ModalAlertProps {
  alerts: AlertsCount[];
}

const ModalAlerts: React.FC<ModalAlertProps> = ({ alerts }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-xs mb-0 h-[0.5px] flex items-center justify-center"
        >
          Ver más
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Ver reporte de Alarmas</DialogTitle>
          <DialogDescription>
            A continuación se muestra un resumen de las alarmas generadas
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center flex-row gap-2">
          <ResponsiveContainer
            width="100%"
            height={550}
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
          <DashboardAlert />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAlerts;
