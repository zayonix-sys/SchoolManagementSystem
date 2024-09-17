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
import { ClassData, fetchClasses } from "@/services/ClassService";
import { fetchSubject, SubjectData } from "@/services/subjectService";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";
import ViewSubjectTeacher from "./veiw-subject-teacher";
import AssignSubjectTeacher from "./assign-subject-teacher";

const Subjects = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classData, subjectData, employeeData] = await Promise.all([
          fetchClasses(),
          fetchSubject(),
          fetchEmployees(),
        ]);

        setClasses(classData.data as ClassData[]);
        setSubjects(subjectData.data as SubjectData[]);
        setEmployees(employeeData.data as EmployeesData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
    // fetchEmployeeAndSubjectData();

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Subjects</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddSubject />
          <AddAssignSubject classes={classes} subject={subjects} />
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
                <SubjectReportCard/>
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
              <SubjectAssignTable classes={classes} subject={subjects} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Subjects;
