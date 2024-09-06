"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Table } from "@/components/ui/table";
import SubjectReportCard from "./reports";
import AddSubject from "./add-subject";
import SubjectTeacherTable from "./veiw-subject-teacher";
import AssignSubjectTeacher from "./assign-subject-teacher";
import { useEffect, useState } from "react";
import { fetchSubject, SubjectData } from "@/services/subjectService";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";


const Subjects = () => {
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   
  useEffect(() => {
    const fetchEmployeeAndSubjectData = async () => {
      setLoading(true);
      try {
        const employeeResponse = await fetchEmployees();
        const subjectResponse = await fetchSubject();
        setEmployees(employeeResponse.data as EmployeesData[]);
        setSubjects(subjectResponse.data as SubjectData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeAndSubjectData();
  }, []);
  return (
    <div>
      <div> 
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Subjects</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddSubject />
          <AssignSubjectTeacher subject={subjects} employee={employees}/>
        </div>
      </div>
      <Accordion 
      type="single" 
      collapsible 
      className="w-full border rounded-md divide-y mt-5"
      defaultValue={`item-1`}
      >
        <AccordionItem value="item-1" className=" shadow-none rounded-none open">
          <AccordionTrigger>Subject Details</AccordionTrigger>
          <AccordionContent>
             
            <div className="col-span-12 md:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                    <SubjectReportCard/>
                    <Table/>
                  </div>
                </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    <SubjectTeacherTable employee={employees} subject={subjects} />
    </div>
  );
};

export default Subjects;