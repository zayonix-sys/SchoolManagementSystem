"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import AddEmployee from "./add-employee";
//import AddEmployeeRole from "./add-employee-role";
import EmployeeListTable from "./employee-table";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";
import { useEffect, useState } from "react";

const Page = () => {
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEmployeesData = async () => {
      setLoading(true);
      try {
        const response = await fetchEmployees();
        setEmployees(response.data as EmployeesData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeesData();
  }, []);
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Employees</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex justify-end space-x-4">
        <AddEmployee employees={employees}/>
        {/* <AddEmployeeRole /> */}
      </div>
      <EmployeeListTable employees={employees}/>
    </div>
  );
};

export default Page;
