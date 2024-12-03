"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Table } from "@/components/ui/table";
import SubjectReportCard from "./reports";
import AddSubject from "./add-subject";
import AddAssignSubject from "./add-assignsubject";
import SubjectAssignTable from "./classSubject-table";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";
import AssignSubjectTeacher from "./assign-subject-teacher";
import { ClassData, useFetchClassQuery } from "@/services/apis/classService";
import { SubjectData, useFetchSubjectQuery } from "@/services/apis/subjectService";
import { SubjectTeacherData, useFetchSubjectTeacherQuery } from "@/services/apis/assignSubjectTeacherService";
import { AssignClassSubjectData, useFetchClassSubjectQuery } from "@/services/apis/assignClassSubjectService";

const Subjects = () => {
  const {data: classData, isLoading, isError, refetch: classRefetch} = useFetchClassQuery();
  const classes = classData?.data as ClassData[];
  const {data: subjectTeacher, refetch: subjectTeacherRefetch} = useFetchSubjectTeacherQuery();
  const subjectTeacherData = subjectTeacher?.data as SubjectTeacherData[];
  const {data: subjectData, isLoading: subjectLoading, isError: subjectError, refetch: subjectRefetch} = useFetchSubjectQuery();
  const subjects = subjectData?.data as SubjectData[];
  const {data: assignSubjectData, refetch: assignSubjectRefetch} = useFetchClassSubjectQuery();
  const assignSubject = assignSubjectData?.data as AssignClassSubjectData[];
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [employeeData] = await Promise.all([
          fetchEmployees(),
        ]);
        setEmployees(employeeData.data as EmployeesData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRefetch = () => {
    classRefetch();
    subjectRefetch();
    subjectTeacherRefetch();
    assignSubjectRefetch();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Academic</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Subjects</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddSubject refetch={handleRefetch}/>
          <AddAssignSubject classes={classes} subject={subjects}  refetch={handleRefetch}/>
          <AssignSubjectTeacher subject={subjects} employee={employees} />
        </div> 
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="shadow-none rounded-none open">
          <AccordionTrigger>Subject Details</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                <SubjectReportCard refetch={handleRefetch} subjects={subjects} subjectTeacherData={subjectTeacherData}/>
                <Table />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        defaultValue="item-2"
      >
        <AccordionItem value="item-2" className="shadow-none rounded-none open">
          <AccordionTrigger>Class Subject Details</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <SubjectAssignTable classes={classes} subject={subjects} refetch={handleRefetch}/>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Subjects;