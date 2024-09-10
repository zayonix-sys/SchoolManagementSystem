"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";
import { fetchSubject, SubjectData } from "@/services/subjectService";
import { SubjectTeacherData, updateSubjectTeacher } from "@/services/subjectTeacherService";
const subjectTeacherSchema = z.object({
  subjectTeacherId: z.coerce.number().optional(),
  employeeId: z.coerce.number(),
  subjectId: z.number().min(1, "Subject is Required"),
});

type SubjectTeacherFormValues = z.infer<typeof subjectTeacherSchema>;

export default function EditSubjectTeacher({subjectTeacherData}: 
  {
    subjectTeacherData: SubjectTeacherData
  }) {

  const {employeeId, subjectId, subjectTeacherId} = subjectTeacherData;


  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<SubjectTeacherFormValues>({
    resolver: zodResolver(subjectTeacherSchema),
    defaultValues: {
      employeeId,
      subjectId,
    },
  });

  const [employee, setEmployee] = useState<EmployeesData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const subjectTeacher = employee.filter(
    (emp) => emp.employeeRoleName === "Teacher"
  );
  useEffect(() => {
    const fetchEmployeeAndSubjectData = async () => {
      setLoading(true);
      try{
      const [employeeResponse, subjectResponse] = await Promise.all([
        fetchEmployees(),
        fetchSubject()
      ]);
        setEmployee(employeeResponse.data as EmployeesData[]);
        setSubjects(subjectResponse.data as SubjectData[]);
              
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployeeAndSubjectData();
  }, []);

  const onSubmit: SubmitHandler<SubjectTeacherFormValues> = async (data) => {
    try {
      const updatedSubjectTeacher = { ...data, subjectTeacherId };
      const response = await updateSubjectTeacher(updatedSubjectTeacher);

      if (response.success) {
        toast.success( "Subject Teacher Updated successfully!");
        reset();
      } else {
        toast.error("Failed to update the Subject Teacher");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Request failed");
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
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
        >
          <Icon icon="heroicons:pencil" className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Edit Subject Teacher</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-6 gap-4 mt-5">
              <div className="col-span-3">
                  <Select
                    defaultValue={employeeId.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("employeeId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectTeacher.map((employeeData) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={employeeData.employeeId}
                          value={employeeData.employeeId?.toString() ?? ""}
                        >
                          {employeeData.firstName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.employeeId && (
                    <p className="text-destructive">
                      {errors.employeeId.message}
                    </p>
                  )}
                </div>  

              <div className="col-span-3">
                  <Select
                    defaultValue={subjectId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("subjectId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={sub.subjectId}
                          value={sub.subjectId?.toString() ?? ""}
                        >
                          {sub.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.subjectId && (
                    <p className="text-destructive">
                      {errors.subjectId.message}
                    </p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <Button type="submit">Update Form</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}