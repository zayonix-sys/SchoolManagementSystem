"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import CampusSheet from "./add-campus";
import ReportsCard from "./reports";
import ReportsArea from "./reports-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AddDepartment from "./add-department";
import { CampusData, getCampuses } from "@/services/campusService";
import { useEffect, useState } from "react";
import AddCampus from "./add-campus";
import EditCampus from "./edit-campus";


const Campus = () => {
  const [campuses, setCampuses] = useState<CampusData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampuses = async () => {
      setLoading(true);
      try {
        const campuses = await getCampuses();
        setCampuses(campuses.data as CampusData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  return (
    <div aria-hidden="true">
      <div> 
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Campus</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddCampus />
          <AddDepartment />
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
  // defaultValue={`item-${campuses[0]?.campusId}`}
  defaultValue={`item-1`}
>
  {campuses.map((campus, index) => (
    <AccordionItem
      key={campus.campusId}
      value={`item-${campus.campusId}`} // This value should match defaultValue
      className="shadow-none rounded-none"
    >
      <AccordionTrigger>
        Campus: {index + 1} - {campus.campusName}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-row-reverse">
          {campus.campusId !== undefined && (
            <EditCampus campusId={campus.campusId} />
          )}
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
          <ReportsCard campusId={campus.campusId} />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

    </div>
  );
};

export default Campus;