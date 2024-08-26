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
import SelectionOperation from "./table-selection-operation";
import { useEffect, useState } from "react";
import { DepartmentData } from "@/services/departmentService";
import { CampusData } from "@/services/campusService";

//we can change the props "side"'s value to 'top', 'left', 'bottom', 'right' so that the sheet will come out from different direction.

export default function ViewDepartment({
  campus,
}: {
  campus: CampusData | null;
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
          <SheetTitle>Department</SheetTitle>
          <SheetDescription>Campus - {campus?.campusName}</SheetDescription>
        </SheetHeader>
        <div>
          <div className="py-6">
            <SelectionOperation campus={campus ?? null} />
          </div>
          <div className="space-x-4 rtl:space-x-reverse pt-[120px]">
            <Button variant="outline" size="xs">
              Cancel
            </Button>
            <Button size="xs">Ok</Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
