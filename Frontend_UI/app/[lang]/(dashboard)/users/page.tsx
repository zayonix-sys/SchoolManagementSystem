"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getUserRoles, UserRoleData } from "@/services/userRoleService";
import { fetchAllUser, UserData } from "@/services/userService";
import { useEffect, useState } from "react";
import ViewUserRole from "./veiw-user-role";
import UserListTable from "./user-table";
import AddUser from "./add-user";
import ViewUserPermission from "./view-user-permission";
import { CampusData, useFetchCampusesQuery } from "@/services/apis/campusService";




const Page = () => {
  const {data: campuses, isLoading: campusLoading, isError: campusError, refetch: campusRefetch} = useFetchCampusesQuery();
  const campusesData = campuses?.data as CampusData[];

  const [users, setUsers] = useState<UserData[]>([]);
  const [userRole, setUserRole] = useState<UserRoleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserAndRoles = async () => {
      setLoading(true);
      try {
        const userResponse = await fetchAllUser();
        const userRoleResponse = await getUserRoles();
        setUsers(userResponse.data as UserData[]);      
        setUserRole(userRoleResponse.data as UserRoleData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRoles();
  }, []);
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Users</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex justify-end space-x-4 m-2">
        <ViewUserPermission selectedPermission={null} />  
        {/* <AddUser users={users} userRole={userRole} campuses={campuses}/>         */}
        <ViewUserRole selectedRole={null}/>
      </div>
      <UserListTable users={users} campus={campusesData}/>
      {/* <UserListTable users={users}/> */}  

    </div>
  );
};

export default Page;
