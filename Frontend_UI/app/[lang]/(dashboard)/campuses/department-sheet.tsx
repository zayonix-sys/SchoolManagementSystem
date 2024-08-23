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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define Zod schema
const departmentSchema = z.object({
  campusId: z.number().min(1, "Campus Name is required"),
  departmentName: z.string().min(1, "Department Name is required"),
  description: z.string().min(1)
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

export default function DepartmentSheet() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
  });
  // const [campuses, setCampuses] = useState<CampusData[]>([]);
  const campuses = [
    {campusId: 1, caampusName: "Abcde"},
    {campusId: 2, caampusName: "Xyz"},
    {campusId: 3, caampusName: "de"},
  ]
  // useEffect(() => {
  //   const fetchCampuses = async () => {
  //     // setLoading(true);
  //     try {
  //       const data = await getCampuses();
  //       setCampuses(data);
  //       console.log(campuses);
  //     } catch (err) {
  //       //setError(err);
  //     } finally {
  //       //setLoading(false);
  //     }
  //   };

  //   fetchCampuses();
  // }, []);
  const onSubmit: SubmitHandler<DepartmentFormValues> = async data => {
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
        <Button>
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
              <Select {...register("campusId")}>
                  <SelectTrigger aria-label="Campus">
                    <SelectValue placeholder="Select Campus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {campuses.map((campus) => (
                        <SelectItem key={campus.campusId} value={String(campus.campusId)}>
                          {campus.campusId} {/* Replace with campus name or whatever display text you prefer */}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
