"use client";

import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reports from "./reports";
import AddApplicant from "./add-applicant";
import ApplicantListTable from "./veiw-applicant";
import {
  ApplicantApplicationDetail,
  useGetApplicantsQuery,
} from "@/services/apis/applicantService";
import {
  SectionData,
  useFetchSectionQuery,
} from "@/services/apis/sectionService";

const Applicants = () => {
  const { data: sections } = useFetchSectionQuery();
  const sectionData = (sections?.data as SectionData[]) || [];
  const {
    data: applicantsData,
    isLoading,
    isError,
    refetch,
  } = useGetApplicantsQuery();
  const applicants =
    (applicantsData?.data as ApplicantApplicationDetail[]) || [];

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (isError) {
    return <div>Error</div>; // Show error message if any
  }

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Academic</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Applicants</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4 m-2">
          <AddApplicant refetch={handleRefetch} />
        </div>
      </div>

      {/* Render ApplicantListTable directly */}
      <ApplicantListTable
        applicants={applicants}
        refetch={handleRefetch}
        sectionData={sectionData}
      />
    </div>
  );
};

export default Applicants;
