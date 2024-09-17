"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { ClassData, deleteClass, fetchClasses } from "@/services/ClassService";
import { useEffect, useState } from "react";
import { CampusData, getCampuses } from "@/services/campusService";
import AddTimeTable from "./add-timetable";
import {
  AssignSubjectData,
  fetchAssignSubject,
} from "@/services/assignSubjectService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddPeriods from "./add-periods";
import { fetchPeriods, PeriodsData } from "@/services/periodService";
import ViewTimeTable from "./view-timetable";
import SubjectReportCard from "../subjects/reports";
import TimeTableReportCard from "../subjects/reports";
import PeriodsReports from "./periods-reports";

const TimeTables = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<AssignSubjectData[]>([]);
  const [campuses, setCampuses] = useState<CampusData[]>([]);
  const [periods, setPeriods] = useState<PeriodsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classData, subjectData, campusesData, periodsData] =
          await Promise.all([
            fetchClasses(),
            fetchAssignSubject(),
            getCampuses(),
            fetchPeriods(),
          ]);

        setClasses(classData.data as ClassData[]);
        setSubjects(subjectData.data as AssignSubjectData[]);
        setCampuses(campusesData.data as CampusData[]);
        setPeriods(periodsData.data as PeriodsData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id: number) => {
    const isConfirmed = confirm("Are you sure you want to delete this campus?");

    if (isConfirmed) {
      try {
        await deleteClass(id);
        alert("Class deleted successfully");
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class");
      }
    } else {
      alert("Deletion cancelled");
    }
  };

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Time Tables</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddTimeTable
            classes={classes}
            subject={subjects}
            campus={campuses}
            periods={periods}
          />
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="shadow-none rounded-none open">
          <AccordionTrigger>View Class Periods</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                <PeriodsReports Periods={periods} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {classes.length > 0 && (
        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-md divide-y mt-5"
          defaultValue={`item-${classes[0].classId}`}
        >
          {classes.map((classItem) => (
            <AccordionItem
              key={classItem.classId}
              value={`item-${classItem.classId}`}
              className="shadow-none rounded-none open"
            >
              <AccordionTrigger>
                {classItem.className} TimeTable
              </AccordionTrigger>
              <AccordionContent>
                <ViewTimeTable
                  className={classItem.className}
                  subjectData={subjects}
                  periodsData={periods}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default TimeTables;
