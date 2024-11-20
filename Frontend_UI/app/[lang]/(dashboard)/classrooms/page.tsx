"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import CampusSheet from "./add-classroom";
import ReportsCard from "./reports";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ClassroomSheet from "./add-classroom";
import AddSection from "./add-section";
import { Table } from "@/components/ui/table";
import AddClass from "./add-class";
import { ClassData, deleteClass, fetchClasses } from "@/services/ClassService";
import { useEffect, useState } from "react";
import EditClass from "./edit-class";
import AddClassroom from "./add-classroom";
import Campus from "../campuses/page";
import { CampusData, getCampuses } from "@/services/campusService";
import AssignClasses from "./add-assignclasses";
import ClassAssignTable from "./classassign-table";
import AddAssignClasses from "./add-assignclasses";
import {
  SectionData,
  useFetchSectionQuery,
} from "@/services/apis/sectionService";
import {
  ClassroomData,
  useFetchClassroomsQuery,
} from "@/services/apis/classroomService";

const Classroom = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [campuses, setCampuses] = useState<CampusData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data, isLoading, refetch } = useFetchSectionQuery();
  const sectionsData = data?.data as SectionData[];

  const {
    data: classrooms,
    isLoading: classroomLoading,
    refetch: classroomsRefetch,
  } = useFetchClassroomsQuery();
  const classroomsData = classrooms?.data as ClassroomData[];

  useEffect(() => {
    const fetchClassesAndClassroomData = async () => {
      setLoading(true);
      try {
        const classData = await fetchClasses();
        const campuses = await getCampuses();
        setClasses(classData.data as ClassData[]);
        setCampuses(campuses.data as CampusData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchClassesAndClassroomData();
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

  const hanldeRefetch = () => {
    refetch();
    classroomsRefetch();
  };

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Classroom</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddClassroom campuses={campuses} refetch={hanldeRefetch} />
          <AddClass />
          <AddSection refetch={hanldeRefetch} />
          <AssignClasses
            classes={classes}
            section={sectionsData}
            classroom={classroomsData}
            campus={campuses}
          />
        </div>
      </div>
      {/* <div className="mt-5 text-2xl font-medium text-default-900">Campus Registration</div> */}
      {/* <Card className="mt-4">
        <CardContent>
        
        <CollapsibleTable />
        </CardContent>
      </Card> */}
      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        defaultValue={`item-1`}
      >
        <AccordionItem
          value="item-1"
          className=" shadow-none rounded-none open"
        >
          <AccordionTrigger>Classroom Details</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                <ReportsCard
                  sections={sectionsData}
                  classrooms={classroomsData}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        // defaultValue={`item-1`}
      >
        <AccordionItem
          value="item-1"
          className=" shadow-none rounded-none open"
        >
          <AccordionTrigger>Classroom Assignment</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              {/* <ReportsCard/>x */}
              <ClassAssignTable
                classes={classes}
                section={sectionsData}
                classroom={classroomsData}
                campus={campuses}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Classroom;
