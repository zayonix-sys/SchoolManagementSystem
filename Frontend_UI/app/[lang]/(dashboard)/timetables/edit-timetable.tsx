"use client"; 
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TimeTableData, updateTimeTable } from "@/services/TimeTableService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClassData } from "@/services/ClassService";
import { PeriodsData } from "@/services/periodService";
import { SubjectData } from "@/services/subjectService";
import { CampusData } from "@/services/campusService";
import { AssignSubjectData } from "@/services/assignSubjectService";
import { Label } from "@/components/ui/label";

const timetableSchema = z.object({
  timetableId: z.coerce.number().optional(),
  campusId: z.coerce.number().min(1, "Campus is required"),
  classId: z.coerce.number().min(1, "Class is required"),
  subjectId: z.coerce.number().min(1, "Subject is required"),
  periodId: z.coerce.number().min(1, "Period is required"),
  dayOfWeek: z.string().min(1, "Day is required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  className: z.string().optional(),
  subjectName: z.string().optional(),
  campusName: z.string().optional()
});

type TimeTableFormValues = z.infer<typeof timetableSchema>;

interface EditTimeTableProps {
  timetableData: TimeTableData[];
  useSubjectData: AssignSubjectData[];
}
const EditTimeTable: React.FC<EditTimeTableProps> = ({ timetableData, useSubjectData }) => {
  const { campusId, classId, subjectId, periodId, dayOfWeek } = timetableData[0];

  const { setValue, handleSubmit, reset, formState: { errors } } = useForm<TimeTableFormValues>({
    resolver: zodResolver(timetableSchema),
    defaultValues: {
      campusId,
      classId,
      subjectId,
      periodId,
      dayOfWeek,
    },
  });

  const onSubmit: SubmitHandler<TimeTableFormValues> = async (data) => {
    try {
      const updatedTimeTable = { ...data, timetableId: timetableData[0].timetableId };
      const response = await updateTimeTable(updatedTimeTable);

      if (response.success) {
        toast.success(`TimeTable Updated Successfully!`);
        reset();
      } else {
        toast.error("Failed to update the Time Table");
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
          className="h-4 w-4"
        >
          <Icon icon="heroicons:pencil" className="h-3 w-3" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Edit Time Table</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-3">
                  <Select
                    defaultValue={campusId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("campusId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {timetableData.map((campuses) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={campuses.campusId}
                          value={campuses.campusId?.toString() ?? ""}
                        >
                          {campuses.campusName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.campusId && (
                    <p className="text-destructive">
                      {errors.campusId.message}
                    </p>
                  )}
                </div>

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
                      {timetableData.map((classes) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={classes.classId}
                          value={classes.classId?.toString() ?? ""}
                        >
                          {classes.className}
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
                    defaultValue={subjectId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("subjectId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {useSubjectData.map((subject) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={subject.subjectIds.join(',')}
                          value={subject.subjectIds?.toString() ?? ""}
                        >
                          {subject.subjectName}
                          
                        </SelectItem>
                        
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm mt-2 text-gray-500">Change subject for updating the Timetable.</p>

                  {errors.subjectId && (
                    <p className="text-destructive">
                      {errors.subjectId.message}
                    </p>
                  )}
                </div>

                <div className="col-span-3">
                  <Select
                    defaultValue={dayOfWeek?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("dayOfWeek", (value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Day of the Week" />
                    </SelectTrigger>
                    <SelectContent>
                      {timetableData.map((day) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={day.dayOfWeek}
                          value={day.dayOfWeek.toString() ?? ""}
                        >
                          {day.dayOfWeek}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.dayOfWeek && (
                    <p className="text-destructive">
                      {errors.dayOfWeek.message}
                    </p>
                  )}
                </div>

                <div className="col-span-3">
                  <Select
                    defaultValue={periodId?.toString() ?? ""}
                    onValueChange={(value) =>
                      setValue("periodId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Period" />
                    </SelectTrigger>
                    <SelectContent>
                      {timetableData.map((periods) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={periods.periodId}
                          value={periods.periodId?.toString() ?? ""}
                        >
                          {periods.periodName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.periodId && (
                    <p className="text-destructive">
                      {errors.periodId.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Button type="submit">Update</Button>
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

export default EditTimeTable;