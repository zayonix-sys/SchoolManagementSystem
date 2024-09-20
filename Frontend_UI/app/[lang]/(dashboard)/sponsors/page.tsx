"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useEffect, useState } from "react";
import AddSponsorForm from "./add-sponsor-form";
import SponsorListTable from "./sponsor-list-table";
import { fetchSponsor, SponsorData } from "@/services/sponsorService";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SponsorsReports from "./sponsors-reports";

const Page = () => {
  const [sponsors, setSponsors] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sponsorData] = await Promise.all([
          fetchSponsor(),

        ]);
        setSponsors(sponsorData.data as SponsorData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Administration</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Sponsor</BreadcrumbItem>
        </Breadcrumbs>
        {/* <div className="flex justify-end space-x-4 m-2"> */}
        <AddSponsorForm />
        {/* </div> */}
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-md divide-y mt-5"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" className="shadow-none rounded-none open">
            <AccordionTrigger>View Sponsor Details</AccordionTrigger>
            <AccordionContent>
              <div className="col-span-12 md:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                  <SponsorsReports Sponsors={sponsors} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        
      

        

        


    </>
  );
};

export default Page;
