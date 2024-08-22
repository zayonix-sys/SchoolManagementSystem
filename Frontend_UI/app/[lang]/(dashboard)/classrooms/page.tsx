"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import CampusSheet from "./classroom-sheet";
import ReportsCard from "./reports";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ClassSheet from "./class-sheet";
import ClassroomSheet from "./classroom-sheet";
import SectionSheet from "./section-sheet";
import { Table } from "@/components/ui/table";
const Classroom = () => {
  return (
    <div>
      <div> 
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Classroom</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <ClassroomSheet/>
          <ClassSheet/>
          <SectionSheet/>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
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