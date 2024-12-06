"use client";

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentData, useFetchStudentByClassWiseQuery } from "@/services/apis/studentService";
import { ClassData, useFetchClassQuery } from "@/services/apis/classService";
import StudentList from "./student-list";

const Page = () => {
  const [classId, setClassId] = useState<number | null>(null);
  console.log(classId);
  const { data: students, refetch } = useFetchStudentByClassWiseQuery(classId ?? 0 );
  const studentData = Array.isArray(students?.data) ? (students?.data as StudentData[]) : [];

  const {data: classData, isLoading: classLoading, refetch: classRefetch, } = useFetchClassQuery();
  const classes = classData?.data as ClassData[];

  const handleRefetch = () => {
    refetch();
    classRefetch();
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Academic</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Students Results</BreadcrumbItem>
      </Breadcrumbs>

      <div className="col-span-1 mb-4 mt-4">
        <Label>Select Class</Label>
        <Select onValueChange={(value) => setClassId(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classes?.map((cd) => (
              <SelectItem key={cd.classId} value={cd.classId?.toString() || ""}>
                {cd.className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <StudentList
        students={studentData}
        classData={classes}
        refetch={handleRefetch}
      />
    </div>
  );
};

export default Page;
