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
import StudentList from "./student-list-table";
import { ClassData, useFetchClassQuery } from "@/services/apis/classService";
import {
  StudentData,
  useFetchStudentByClassWiseQuery,
} from "@/services/apis/studentService";

const Page = () => {
  const [classId, setClassId] = useState<number | null>(null);
  const { data: students, refetch } = useFetchStudentByClassWiseQuery(
    classId ?? 0
  );
  const studentData = Array.isArray(students?.data)
    ? (students?.data as StudentData[])
    : [];

  const {
    data: classData,
    isLoading: classLoading,
    refetch: classRefetch,
  } = useFetchClassQuery();
  const classes = classData?.data as ClassData[];

  const handleRefetch = () => {
    refetch();
    classRefetch();
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Students</BreadcrumbItem>
      </Breadcrumbs>

      <div className="col-span-1 mb-4">
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
