"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import CampusSheet from "./classroom-sheet";
import ReportsCard from "./reports";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ClassroomSheet from "./classroom-sheet";
import AddSection from "./add-section";
import { Table } from "@/components/ui/table";
import AddClass from "./add-class";
import { ClassData, deleteClass, fetchClasses } from "@/services/ClassService";
import { useEffect, useState } from "react";
import EditClass from "./edit-class";



const Classroom = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassesData = async () => {
      setLoading(true);
      try {
        const classData = await fetchClasses();
        setClasses(classData.data as ClassData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchClassesData();
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
          <ClassroomSheet/>
          <AddClass/>
          <AddSection/>
        </div>
      </div>
      {/* <div className="mt-5 text-2xl font-medium text-default-900">Campus Registration</div> */}
      {/* <Card className="mt-4">
        <CardContent>
        
        <CollapsibleTable />
        </CardContent>
      </Card> */}
      <Accordion type="single" collapsible className="w-full border rounded-md divide-y mt-5">
        <AccordionItem value="item-1" className=" shadow-none rounded-none open">
          <AccordionTrigger>Classroom Details</AccordionTrigger>
          <AccordionContent>
             
            <div className="col-span-12 md:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 gap-5">
                    <ReportsCard />
                    <Table/>
                  </div>
                </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  
    </div>
  );
};

export default Classroom;