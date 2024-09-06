"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Table } from "@/components/ui/table";
import SubjectReportCard from "./reports";
import AddSubject from "./add-subject";
import AddAssignSubject from "./add-assignsubject";
import { ClassData, fetchClasses } from "@/services/ClassService";
import { fetchSubject, SubjectData } from "@/services/subjectService";
import { useEffect, useState } from "react";
import SubjectAssignTable from "./classSubject-table";

const Subjects = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subject, setSubject] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassesAndSubjectData = async () => {
      setLoading(true);
      try {
        const classData = await fetchClasses();
        const subjectData = await fetchSubject();
        setClasses(classData.data as ClassData[]);
        setSubject(subjectData.data as SubjectData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchClassesAndSubjectData();
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
          <AddAssignSubject classes={classes} subject={subject} />
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
                <SubjectReportCard />
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
        defaultValue={`item-1`}
      >
        <AccordionItem value="item-1" className=" shadow-none rounded-none open">
          <AccordionTrigger>Subject Details</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <SubjectAssignTable  classes={classes} subject={subject}/>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


    </div>
  );
};

export default Subjects;