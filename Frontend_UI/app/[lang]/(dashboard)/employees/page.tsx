"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";
import { useEffect, useState } from "react";
import AddEmployee from "./add-employee";
import EmployeeListTable from "./employee-table";
import AddRole from "./add-roles";
import ViewRole from "./view-roles";
import { getRoles, RoleData } from "@/services/employeeRoleService";
import { CampusData, useFetchCampusesQuery } from "@/services/apis/campusService";

const Page = () => {
  const {data: campus, isLoading, isError, refetch} = useFetchCampusesQuery();
  const campuses = campus?.data as CampusData[];
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [employeeRole, setEmployeeRole] = useState<RoleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEmployeeAndCampusData = async () => {
      setLoading(true);
      try {
        const employeeResponse = await fetchEmployees();
        const empRoleResponse = await getRoles();
        setEmployees(employeeResponse.data as EmployeesData[]);
        setEmployeeRole(empRoleResponse.data as RoleData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeAndCampusData();
  }, []);
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Employees</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex justify-end space-x-4 m-2">
        <AddEmployee employees={employees} campuses={campuses} employeeRole={employeeRole}/>
        <ViewRole selectedRole={null}/>
      </div>
      <EmployeeListTable employees={employees} campuses={campuses}/>
    </div>
  );
};

export default Page;
