"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import CampusSheet from "./add-classroom";
import ReportsCard from "./reports";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ClassroomSheet from "./add-classroom";
import AddSection from "./add-section";
import { Table } from "@/components/ui/table";
import AddClass from "./add-class";
import { ClassData, deleteClass, fetchClasses } from "@/services/ClassService";
import { useEffect, useState } from "react";
import EditClass from "./edit-class";
import AddClassroom from "./add-classroom";
import { ClassroomData, fetchClassrooms } from "@/services/classroomService";
import Campus from "../campuses/page";
import { CampusData, getCampuses } from "@/services/campusService";
import AssignClasses from "./add-assignclasses";
import { fetchSection, SectionData } from "@/services/SectionService";
import ClassAssignTable from "./classassign-table";

const Classroom = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [classroom, setClassroom] = useState<ClassroomData[]>([]);
  const [section, setSection] = useState<SectionData[]>([]);
  const [campuses, setCampuses] = useState<CampusData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassesAndClassroomData = async () => {
      setLoading(true);
      try {
        const classData = await fetchClasses();
        const classroomData = await fetchClassrooms();
        const sectionData = await fetchSection();
        const campuses = await getCampuses();
        setClasses(classData.data as ClassData[]);
        setClassroom(classroomData.data as ClassroomData[]);
        setSection(sectionData.data as SectionData[]);
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

  return (
    <div>
      <div> 
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Classroom</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddClassroom campuses={campuses} />
          <AddClass/>
          <AddSection/>
          <AssignClasses classes={classes} section={section} classroom={classroom} campus={campuses}/>

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
        <AccordionItem value="item-1" className=" shadow-none rounded-none open">
          <AccordionTrigger>Classroom Details</AccordionTrigger>
          <AccordionContent>
             
            <div className="col-span-12 md:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                    <ReportsCard />
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
        <AccordionItem value="item-1" className=" shadow-none rounded-none open">
          <AccordionTrigger>Classroom Assignment</AccordionTrigger>
          <AccordionContent>
             
            <div className="col-span-12 md:col-span-8">
                  
                    {/* <ReportsCard/>x */}
                    <ClassAssignTable classes={classes} section={section} classroom={classroom} campus={campuses}/>
                  
                </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  
    </div>
  );
};

export default Classroom;