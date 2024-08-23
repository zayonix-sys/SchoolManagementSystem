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
import { DepartmentData, getDepartments } from "@/services/departmentService";

//we can change the props "side"'s value to 'top', 'left', 'bottom', 'right' so that the sheet will come out from different direction.

export default function ViewDepartment({ campusId }: { campusId: number | undefined }) {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      // setLoading(true);
      try {
        const data = await getDepartments(campusId as number);
        setDepartments(data);
        console.log(departments);
        
      } catch (err) {
        //setError(err);
      } finally {
        //setLoading(false);
      }
    };

    fetchDepartments();
  }, []);
  
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button variant="ghost"
                size="sm"
                className="hover:bg-transparent text-xs hover:text-default-800 px-1">View List</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Department</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div>
          <div className="py-6">
            <SelectionOperation departments={departments}/>
          </div>
          <div className="space-x-4 rtl:space-x-reverse pt-[120px]">
            <Button variant="outline" size="xs">Cancel</Button>
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