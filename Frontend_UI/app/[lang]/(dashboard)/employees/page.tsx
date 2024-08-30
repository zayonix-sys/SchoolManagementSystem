"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import AddEmployee from "./add-employee";
//import AddEmployeeRole from "./add-employee-role";
import EmployeeListTable from "./employee-table";

const Page = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Employees</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex justify-end space-x-4">
        <AddEmployee />
        {/* <AddEmployeeRole /> */}
      </div>
      <EmployeeListTable />
    </div>
  );
};

export default Page;
