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
import { SubjectData } from "@/services/subjectService";
import SubjectListTable from "./subject-table";
import SubjectTeacherTable from "./table-subject-teacher";
import { EmployeesData } from "@/services/EmployeeService";

export default function ViewSubjectTeacher({
  subject,
  employee,
}: {
  subject: SubjectData[] | null;
  employee: EmployeesData[] | null;
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
          <SheetTitle>Subject Teacher</SheetTitle>
        </SheetHeader>
        <div>
          <div className="py-6">
            <SubjectTeacherTable
              employee={employee ? employee : []}
              subject={subject ? subject : []}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
