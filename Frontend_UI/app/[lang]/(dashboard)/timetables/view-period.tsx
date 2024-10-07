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
import AddPeriods from "./add-periods";


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
        <div className="flex flex-row-reverse">
          <AddPeriods />
        </div>
        <div className="py-6">
          <PeriodsListTable Periods={periods ?? []} />
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
