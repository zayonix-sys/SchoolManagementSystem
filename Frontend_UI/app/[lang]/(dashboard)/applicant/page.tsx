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
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AddApplicant from "./add-applicant";

const Applicants = () => {
  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Academic</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Applicants</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddApplicant />

          {/* <Button>
            <Icon icon="heroicons:building-office" className="w-6 h-6 mr-2  " />
            Add Department
          </Button> */}
          <Button>
            <Icon icon="heroicons:building-office" className="w-6 h-6 mr-2  " />
            List of Applications
          </Button>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
      >
        <AccordionItem
          value="item-1"
          className=" shadow-none rounded-none open"
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
