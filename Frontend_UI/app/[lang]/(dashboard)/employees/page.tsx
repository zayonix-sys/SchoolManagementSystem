"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmployeesData, fetchEmployees } from "@/services/EmployeeService";
import { useEffect, useState } from "react";
import AddEmployee from "./add-employee";
import EmployeeListTable from "./employee-table";
import AddRole from "./add-roles";
import ViewRole from "./view-roles";
import { CampusData, getCampuses } from "@/services/campusService";
import { DepartmentData } from "@/services/departmentService";
import { getRoles, RoleData } from "@/services/employeeRoleService";

const Page = () => {
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [campuses, setCampuses] = useState<CampusData[]>([]);
  const [employeeRole, setEmployeeRole] = useState<RoleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEmployeeAndCampusData = async () => {
      setLoading(true);
      try {
        const employeeResponse = await fetchEmployees();
        const campusResponse = await getCampuses();
        const empRoleResponse = await getRoles();
        setEmployees(employeeResponse.data as EmployeesData[]);
        setCampuses(campusResponse.data as CampusData[]);
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
      <EmployeeListTable employees={employees}/>
    </div>
  );
};

export default Page;
