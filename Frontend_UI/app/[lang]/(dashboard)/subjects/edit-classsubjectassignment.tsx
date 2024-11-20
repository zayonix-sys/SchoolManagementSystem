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
import {
  ClassroomData,
  fetchClassrooms,
  updateClassroom,
} from "@/services/apis/_classroomService";
import { ClassData, fetchClasses } from "@/services/ClassService";
import { fetchSection, SectionData } from "@/services/SectionService";
import {
  AssignClassData,
  updateClassAssignment,
} from "@/services/assignClassService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampusData, getCampuses } from "@/services/campusService";
import {
  AssignSubjectData,
  updateClassSubjectAssignment,
} from "@/services/assignSubjectService";
import { fetchSubject, SubjectData } from "@/services/subjectService";
import { Checkbox } from "@/components/ui/checkbox";

// Define Zod schema for class form validation
const subjectAssignmentSchema = z.object({
  classSubjectId: z.number().optional(),
  classId: z.number().min(1, "Class is required"),
  subjectIds: z.array(z.number().min(1, "Subject is Required")),
  isActive: z.boolean().optional(),
});

type SubjectAssignFormValues = z.infer<typeof subjectAssignmentSchema>;

export default function EditClassSubjectAssign({
  subjectAssignmentData,
  subject,
}: {
  subjectAssignmentData: AssignSubjectData;
  subject: SubjectData[];
}) {
  const { classId, subjectIds = [], classSubjectId } = subjectAssignmentData; // Default empty array if missing

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubjectAssignFormValues>({
    resolver: zodResolver(subjectAssignmentSchema),
    defaultValues: {
      classId,
      subjectIds, // This ensures the form has a valid subjectIds array
    },
  });

  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassAndSubjectData = async () => {
      setLoading(true);
      try {
        const [classResponse, subjectResponse] = await Promise.all([
          fetchClasses(),
          fetchSubject(),
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
      const updatedSubjectAssignment = { ...data, classId };
      const response = await updateClassSubjectAssignment(
        updatedSubjectAssignment
      );

      if (response.success) {
        toast.success("Subject Assignment Updated successfully!");
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

  const handleCheckboxChange = (subjectId: number, isChecked: boolean) => {
    const currentSubjects = watch("subjectIds") ?? [];

    if (isChecked) {
      setValue("subjectIds", [...currentSubjects, subjectId]);
    } else {
      setValue(
        "subjectIds",
        currentSubjects.filter((id: number) => id !== subjectId)
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="h-7 w-7">
          <Icon icon="heroicons:pencil" className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Edit Subject Assignment</SheetTitle>
        </SheetHeader>
        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-6 gap-4 mt-5">
                <div className="col-span-3">
                  <Select
                    defaultValue={classId?.toString() ?? ""}
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
                    <p className="text-destructive">{errors.classId.message}</p>
                  )}
                </div>

                <div className="col-span-6">
                  <label className="block mb-2">Select Subjects</label>
                  <div className="grid grid-cols-1 gap-4">
                    {subject.map((sub) => (
                      <div
                        key={sub.subjectId !== undefined ? sub.subjectId : 0}
                        className="flex items-center"
                      >
                        <Checkbox
                          variant="filled"
                          id={`subject-${sub.subjectId ?? 0}`}
                          defaultChecked={watch("subjectIds")?.includes(
                            sub.subjectId ?? 0
                          )}
                          checked={watch("subjectIds")?.includes(
                            sub.subjectId ?? 0
                          )} // Controlled checkbox state
                          onCheckedChange={(
                            isChecked
                          ) =>
                            handleCheckboxChange(
                              sub.subjectId ?? 0,
                              Boolean(isChecked)
                            ) // Ensure isChecked is a boolean
                          }
                          className="mr-2"
                        >
                          {sub.subjectName}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                  {errors.subjectIds && (
                    <p className="text-destructive">
                      {errors.subjectIds.message}
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

