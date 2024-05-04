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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { Measurement } from "@/domain/model/Measurement";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

interface DailyReadModalProps {
  measurements: Measurement[];
}

const DailyReadModal: React.FC<DailyReadModalProps> = ({ measurements }) => {
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
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Datos recibidos el día de hoy</DialogTitle>
          <DialogDescription>
            Todos estos son los datos que se han recibido el día de hoy
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[500px]">
          <Table>
            <TableCaption>Una lista de los reportes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Device</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-center">Registro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurements.reverse().map((measurement) => (
                <TableRow key={measurement._id}>
                  <TableCell className="font-medium">
                    {measurement.hostname}
                  </TableCell>
                  <TableCell>{measurement.createdAt + ""}</TableCell>
                  <TableCell className="text-center">
                    {measurement.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyReadModal;
