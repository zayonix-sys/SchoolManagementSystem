"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { applicationStatus } from "@/services/applicantService";
import { toast } from "sonner";

const ApplicationDropdown = ({ applicationId }: { applicationId: number }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await applicationStatus(applicationId, status);
      toast.success(response.message);
    } catch (err: any) {
      toast.error("Faild to Update Status");
      console.error("Error updating application status:", err);
    }
  };

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
        <DropdownMenuItem
          onClick={() => handleStatusUpdate(applicationId, "Approved")}
        >
          <Icon
            icon="heroicons:hand-thumb-up-16-solid"
            className="h-4 w-4 mr-2 text-green-500"
          />
          Admission Approved
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusUpdate(applicationId, "Rejected")}
        >
          <Icon
            icon="heroicons:hand-thumb-down-16-solid"
            className="h-4 w-4 mr-2 text-red-500"
          />
          Admission Rejected
        </DropdownMenuItem>
      </DropdownMenuContent>
      {loading && <p>Loading...</p>}
    </DropdownMenu>
  );
};

export default ApplicationDropdown;
