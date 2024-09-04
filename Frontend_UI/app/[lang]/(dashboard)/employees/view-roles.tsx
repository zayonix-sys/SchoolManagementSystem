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
import { RoleData } from "@/services/employeeRoleService";
import { useEffect, useState } from "react";
import RoleListTable from "./role-table";
import { Icon } from "@iconify/react";
import AddRole from "./add-roles";


// This component allows you to view role details in a sheet.
export default function ViewRole({
  selectedRole,
}: {
  selectedRole: RoleData | null;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button>
          <span className="text-xl mr-1">
            <Icon icon="heroicons:building-library-solid" className="w-6 h-6 mr-2" />
          </span>
          Add/View Role
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Role
          </SheetTitle>
          {/* <div className="relative"> */}
  <SheetDescription className="absolute top-0 right-4  p-4">
    <AddRole />
  </SheetDescription>
{/* </div> */}
        </SheetHeader>
        <div>
          <div className="py-6">
            <RoleListTable />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
