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

// Define Zod schema for class form validation
const classassignmentSchema = z.object({
  classroomId: z.number().min(1, "Room Number is required"),
  classId: z.number().min(1, "Class is required"),
  sectionId: z.number().min(1, "Section is required"),
});

type ClassAssignFormValues = z.infer<typeof classassignmentSchema>;

export default function EditClassSectionAssign({ classAssignmentData}: 
  {
    // classAssignment: AssignClassData[];
    classAssignmentData: AssignClassData,
  }) {

  const {classroomId, classId, sectionId, assignmentId} = classAssignmentData;


  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ClassAssignFormValues>({
    resolver: zodResolver(classassignmentSchema),
    defaultValues: {
      classroomId,
      classId,
      sectionId,
    },
  });

  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassroomsAndClassesAndSectionsData = async () => {
      setLoading(true);
      try{
      const [classResponse, sectionResponse, classroomResponse] = await Promise.all([
        fetchClasses(),
        fetchSection(),
        fetchClassrooms(),
      ]);
        setClasses(classResponse.data as ClassData[]);
        setSections(sectionResponse.data as SectionData[]);
        setClassrooms(classroomResponse.data as ClassroomData[]);
        
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassroomsAndClassesAndSectionsData();
  }, []);

  const onSubmit: SubmitHandler<ClassAssignFormValues> = async (data) => {
    try {
      const updatedClassAssignment = { ...data, assignmentId };
      const response = await updateClassAssignment(updatedClassAssignment);

      if (response.success) {
        toast.success( "Class Assignment Updated successfully!");
        reset();
      } else {
        toast.error("Failed to update the class assignment");
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
          <SheetTitle>Edit Class Assignment</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-6 gap-4 mt-5">
              <div className="col-span-3">
                  <Select
                    defaultValue={classroomId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("classroomId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      {classrooms.map((classroom) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={classroom.classroomId}
                          value={classroom.classroomId?.toString() ?? ""}
                        >
                          {classroom.roomNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.classroomId && (
                    <p className="text-destructive">
                      {errors.classroomId.message}
                    </p>
                  )}
                </div>
                <div className="col-span-3 ">
                <Select
                    defaultValue={classId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("classId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Class" />
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
                <div className="col-span-2 lg:col-span-3">
                <Select
                    defaultValue={sectionId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("sectionId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={section.sectionId}
                          value={section.sectionId?.toString() ?? ""}
                        >
                          {section.sectionName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.sectionId && (
                    <p className="text-destructive">
                      {errors.sectionId.message}
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
