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
import { Icon } from "@iconify/react";
import { UserRoleData } from "@/services/userRoleService";
import UserRoleTable from "./user-role-table";
import AddUserRole from "./add-user-role";


// This component allows you to view role details in a sheet.
export default function ViewUserRole({
  selectedRole,
}: {
  selectedRole: UserRoleData | null;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button>
          <span className="text-xl mr-1">
            <Icon icon="heroicons:building-library-solid" className="w-6 h-6 mr-2" />
          </span>
          Add/View User Role
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>User Role
          </SheetTitle>
          {/* <div className="relative"> */}
  <SheetDescription className="absolute top-0 right-4  p-4">
    <AddUserRole />
  </SheetDescription>
{/* </div> */}
        </SheetHeader>
        <div>
          <div className="py-6">
            <UserRoleTable />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
