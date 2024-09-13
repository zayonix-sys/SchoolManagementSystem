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

export default function ViewDepartment({ campus }: { campus: CampusData }) {
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
            <SelectionOperation campus={campus} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
