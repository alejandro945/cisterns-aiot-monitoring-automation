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
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { Measurement } from "@/domain/model/Measurement";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";

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
          {DASHBOARD_PAGE.cardRecentRead.seeMore}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{DASHBOARD_PAGE.cardRecentRead.title}</DialogTitle>
          <DialogDescription>
            {DASHBOARD_PAGE.cardRecentRead.description}
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
