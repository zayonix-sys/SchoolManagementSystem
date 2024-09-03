"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Table } from "@/components/ui/table";
import SubjectReportCard from "./reports";
import AddSubject from "./add-subject";

const Subjects = () => {
  
  return (
    <div>
      <div> 
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Subjects</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddSubject />
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
  
    </div>
  );
};

export default Subjects;