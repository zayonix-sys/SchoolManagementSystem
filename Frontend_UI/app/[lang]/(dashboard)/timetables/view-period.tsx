import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PeriodsData } from "@/services/periodService";
import PeriodsListTable from "./periods-table";

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":"); // Split the time to extract hour and minute
  const parsedTime = new Date();
  parsedTime.setHours(parseInt(hour, 10), parseInt(minute, 10));

  return parsedTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // For AM/PM formatting
  });
};

export default function ViewPeriod({
  periods,
}: {
  periods: PeriodsData[] | null;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-transparent text-xs hover:text-default-800 px-1"
        >
          View List
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Class Periods</SheetTitle>
        </SheetHeader>
        <div>
          <div className="py-6">
            <PeriodsListTable Periods={periods ?? []}/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
