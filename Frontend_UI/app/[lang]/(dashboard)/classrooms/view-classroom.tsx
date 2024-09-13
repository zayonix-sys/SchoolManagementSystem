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
import { useEffect, useState } from "react";
import { ClassData } from "@/services/ClassService"; // Replace with actual service import
import ClassListTable from "./class-table";
import { ClassroomData } from "@/services/classroomService";
import ClassroomListTable from "./classroom-table";

// This component allows you to view class details in a sheet.
export default function ViewClassroom({
  selectedClassroom,
}: {
  selectedClassroom: ClassroomData[] | null;
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
          <SheetTitle>Classrooms</SheetTitle>
          {/* <SheetDescription>Class Name - {classes.className}</SheetDescription> */}
        </SheetHeader>
        <div>
          <div className="py-6">
            <ClassroomListTable />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
