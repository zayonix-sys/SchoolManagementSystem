"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { addDepartment } from "@/services/departmentService";
import { CampusData, getCampuses } from "@/services/campusService";
import DashboardSelect from "@/components/dasboard-select";

// Define Zod schema
const departmentSchema = z.object({
  campusId: z.coerce.number(),
  departmentName: z.string().min(1, "Department Name is required"),
  description: z.string().min(1),
  // isActive: z.boolean() // Add this line
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;
interface DepartmentSheetProps {
  campuses: CampusData[];
}
export default function DepartmentSheet({campuses}: DepartmentSheetProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
  });
  
  const onSubmit: SubmitHandler<DepartmentFormValues> = async data => {
    console.log(data);
    let response;
    try
    {
      // Send data to backend Api using campusService
      const response = await addDepartment(data);  
      console.log(response)
      if (response != null) {
        // Handle successful response
        console.log("Success:", response);
        toast.success( response.departmentName + "Department Added  successfully!");
        reset();
      } else {
        // Handle errors from server
        console.error("Error:", response);
      }
    }
    catch (error)
    {
      toast.error("Request Failed", response);
    }
    
    
  };

  const handleError = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the form.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-hidden="true">
          <span className='text-xl mr-1'>
            <Icon icon="heroicons:building-library-solid" className="w-6 h-6 mr-2" />
          </span>
          Add Department
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Department</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
              <select 
                className="flex-1 w-full rounded py-2 border-blue-100" 
                id="campus" 
                {...register("campusId", {valueAsNumber: true})}
              >
                {campuses.map(campus => (
                  <option key={campus.campusId} value={Number(1)}>
                    {campus.campusName}
                  </option>
                ))}
              </select>
                  {/* <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select> */}
                  {errors.campusId && <p className="text-destructive">{errors.campusId.message}</p>}
                </div>
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Department Name"
                    {...register("departmentName")}
                  />
                  {errors.departmentName && <p className="text-destructive">{errors.departmentName.message}</p>}
                </div>
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Description"
                    {...register("description")}
                  />
                  {errors.description && <p className="text-destructive">{errors.description.message}</p>}
                </div>
                <div className="col-span-2">
                  <Button type="submit">Submit Form</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
