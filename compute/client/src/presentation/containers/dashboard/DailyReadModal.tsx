import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { Measurement } from "@/domain/model/Measurement";
import { DASHBOARD_PAGE } from "@/presentation/constants/dash.constants";
import DataTable from "@/presentation/components/common/data-table";

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
          <DataTable
            data={measurements}
            order={"createdAt"}
            search={"hostname"}
            onDelete={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyReadModal;
