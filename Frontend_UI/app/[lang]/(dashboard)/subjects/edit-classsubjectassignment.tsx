"use client"; // Make sure this is at the very top

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
import { ClassroomData, fetchClassrooms, updateClassroom } from "@/services/classroomService";
import { ClassData, fetchClasses } from "@/services/ClassService";
import { fetchSection, SectionData } from "@/services/SectionService";
import { AssignClassData, updateClassAssignment } from "@/services/assignClassService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampusData, getCampuses } from "@/services/campusService";
import { AssignSubjectData, updateClassSubjectAssignment } from "@/services/assignSubjectService";
import { fetchSubject, SubjectData } from "@/services/subjectService";

// Define Zod schema for class form validation
const subjectAssignmentSchema = z.object({
  classSubjectId: z.number().optional(),
  classId: z.number().min(1, "Class is required"),
  subjectId: z.number().min(1, "Subject is required"),
  isActive: z.boolean().optional()
});

type SubjectAssignFormValues = z.infer<typeof subjectAssignmentSchema>;

export default function EditClassSubjectAssign({subjectAssignmentData}: 
  {
    subjectAssignmentData: AssignSubjectData
  }) {

  const {classId, subjectId, classSubjectId} = subjectAssignmentData;


  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<SubjectAssignFormValues>({
    resolver: zodResolver(subjectAssignmentSchema),
    defaultValues: {
      classId,
      subjectId,
    },
  });

  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassAndSubjectData = async () => {
      setLoading(true);
      try{
      const [classResponse, subjectResponse] = await Promise.all([
        fetchClasses(),
        fetchSubject()
      ]);
        setClasses(classResponse.data as ClassData[]);
        setSubjects(subjectResponse.data as SubjectData[]);
              
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassAndSubjectData();
  }, []);

  const onSubmit: SubmitHandler<SubjectAssignFormValues> = async (data) => {
    try {
      const updatedSubjectAssignment = { ...data, classSubjectId };
      const response = await updateClassSubjectAssignment(updatedSubjectAssignment);

      if (response.success) {
        toast.success( "Subject Assignment Updated successfully!");
        reset();
      } else {
        toast.error("Failed to update the Subject assignment");
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
          <SheetTitle>Edit Subject Assignment</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-6 gap-4 mt-5">
              <div className="col-span-3">
                  <Select
                    defaultValue={classId.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("classId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classData) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={classData.classId}
                          value={classData.classId?.toString() ?? ""}
                        >
                          {classData.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.classId && (
                    <p className="text-destructive">
                      {errors.classId.message}
                    </p>
                  )}
                </div>  

              <div className="col-span-3">
                  <Select
                    defaultValue={subjectId?.toString() ?? ""}
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
