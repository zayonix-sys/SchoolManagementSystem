"use client";

import React, { useEffect, useState } from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getStudentByClassWise, StudentData } from '@/services/studentService';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StudentList from './student-list-table';
import { ClassData, useFetchClassQuery } from '@/services/apis/classService';


const Page = () => {
  const [student, setStudent] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classId, setClassId] = useState<number | null>(null);
  const {data: classData, isLoading: classLoading, refetch: classRefetch} = useFetchClassQuery();
  const classes = classData?.data as ClassData[];
  
  useEffect(() => {
    const fetchStudentByClass = async (id: number) => {
      setLoading(true);
      try {
        const studentData = await getStudentByClassWise(id);
        setStudent(studentData.data as StudentData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchStudentByClass(classId);
    }
  }, [classId]);

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
              <SelectItem key={cd.classId} value={cd.classId?.toString() || ''}>
                {cd.className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <StudentList classId={classId} classData={classes} />
    </div>
  );
};

export default Page;
