"use client";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import VStepForm from "./applicant-step-form";
import ApplicantStepForm from "./applicant-step-form";

//we can change the props "side"'s value to 'top', 'left', 'bottom', 'right' so that the sheet will come out from different direction.

export default function AddApplicant() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <span className="text-xl mr-1">
            <Icon
              icon="heroicons:building-library-solid"
              className="w-6 h-6 mr-2  "
            />
          </span>
          Add Applicant
        </Button>
      </SheetTrigger>
      <SheetContent
        // className="max-w-[736px]"
        side="top"
        className="p-0 max-h-[450px] overflow-y-auto"
      >
        <SheetHeader className="p-3 border-b border-default-200">
          <SheetTitle>Applicant Registration Form</SheetTitle>
        </SheetHeader>
        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="py-5">
            <ApplicantStepForm />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
