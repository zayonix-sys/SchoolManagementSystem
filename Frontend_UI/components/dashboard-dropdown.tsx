"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
const DashboardDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="secondary"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[196px]"
        align="end"
        side="bottom"
        avoidCollisions
      >
        <DropdownMenuItem>
          <Icon
            icon="heroicons:hand-thumb-up-16-solid"
            className=" h-4 w-4 mr-2 text-green-500"
          />
          Admission Approved
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon
            icon="heroicons:hand-thumb-down-16-solid"
            className=" h-4 w-4 mr-2 text-red-500"
          />
          Admission Rejected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardDropdown;
