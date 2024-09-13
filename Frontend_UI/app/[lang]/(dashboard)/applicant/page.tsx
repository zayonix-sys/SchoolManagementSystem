"use client";

import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reports from "./reports";
import AddApplicant from "./add-applicant";
import { useState, useEffect } from "react";
import { ApplicantApplicationDetail, getApplicants } from "@/services/applicantService";
import ApplicantListTable from "./veiw-applicant";

const Applicants = () => {
  const [applicants, setApplicants] = useState<ApplicantApplicationDetail[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null);

  // Fetch applicants on component mount
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await getApplicants(); // Fetch applicant data
        setApplicants(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Error fetching applicants"); // Set error if any
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Academic</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Applicants</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4 m-2">
          <AddApplicant />
          
        </div>
      </div>

      {/* Render ApplicantListTable directly */}
      <ApplicantListTable applicants={applicants} />

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
      >
        <AccordionItem
          value="item-1"
          className="shadow-none rounded-none open"
        >
          <AccordionTrigger>Campus 1 - Gulshan-e-Maymar</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
                <Reports />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Applicants;
