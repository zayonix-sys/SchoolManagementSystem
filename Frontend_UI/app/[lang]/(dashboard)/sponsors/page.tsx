"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useEffect, useState } from "react";
import AddSponsorForm from "./add-sponsor-form";
import SponsorListTable from "./sponsor-list-table";

const Page = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Sponsor</BreadcrumbItem>
      </Breadcrumbs>
      {/* <div className="flex justify-end space-x-4 m-2"> */}
        <AddSponsorForm/>
      {/* </div> */}
      <SponsorListTable sponsor={[]}/>
    </div>
  );
};

export default Page;
