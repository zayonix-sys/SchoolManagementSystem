import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getUserRoles, UserRoleData } from "@/services/userRoleService";
import { fetchAllUser, UserData } from "@/services/userService";
import { menuItems } from "@/config/menus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { addUserPermission } from "@/services/userPermissionService";

const userPermissionSchema = z.object({
  entities: z.array(z.string()).min(1, "At least one entity must be selected"),
  roleId: z.number().optional(),
  userId: z.number().optional(),
  canCreate: z.boolean(),
  canRead: z.boolean(),
  canUpdate: z.boolean(),
  canDelete: z.boolean(),
});

type UserPermissionFormValues = z.infer<typeof userPermissionSchema>;

export default function AddUserPermission() {
  const [roles, setRoles] = useState<UserRoleData[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [roleId, setRoleId] = useState<number | undefined>();
  const [userId, setUserId] = useState<number | undefined>();
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserPermissionFormValues>({
    resolver: zodResolver(userPermissionSchema),
    defaultValues: {
      entities: [],
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    },
  });

  useEffect(() => {
    setLoadingRoles(true);
    getUserRoles()
      .then((response) => {
        if (response.success) {
          setRoles(response.data);
        } else {
          toast.error("Failed to load roles");
        }
      })
      .catch(() => toast.error("Error fetching roles"))
      .finally(() => setLoadingRoles(false));

    setLoadingUsers(true);
    fetchAllUser()
      .then((response) => {
        if (response.success) {
          setAllUsers(response.data);
        } else {
          toast.error("Failed to load users");
        }
      })
      .catch(() => toast.error("Error fetching users"))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (roleId) {
      const usersByRole = allUsers.filter((user) => user.roleId === roleId);
      setFilteredUsers(usersByRole);
    } else {
      setFilteredUsers([]);
    }
  }, [roleId, allUsers]);

  const onSubmit: SubmitHandler<UserPermissionFormValues> = async (data) => {
    try {
      const response = await addUserPermission({
        ...data,
        userId,
        roleId,
      });

      if (response.success) {
        toast.success("User permission successfully!");
        reset();
      } else {
        console.error("Error:", response);
        toast.error(`Error: ${response.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Request Failed:", error);
      toast.error("Request Failed");
    }
  };

  const handleEntityChange = (title: string) => {
    const updatedEntities = selectedEntities.includes(title)
      ? selectedEntities.filter((entity) => entity !== title)
      : [...selectedEntities, title];

    setSelectedEntities(updatedEntities);
    setValue("entities", updatedEntities, { shouldValidate: true });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add User Permission</Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Permission</SheetTitle>
        </SheetHeader>
        <div className="py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Select
                  {...register("roleId", { valueAsNumber: true })}
                  onValueChange={(value) => setRoleId(Number(value))}
                  disabled={loadingRoles}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.roleId} value={role.roleId?.toString() ?? ""}>
                        {role.roleName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.roleId && <p className="text-destructive">{errors.roleId.message}</p>}
              </div>

              <div className="col-span-1">
                <Select
                  {...register("userId", { valueAsNumber: true })}
                  onValueChange={(value) => setUserId(Number(value))}
                  disabled={loadingUsers || !roleId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredUsers.map((user) => (
                      <SelectItem key={user.userId} value={user.userId?.toString() ?? ""}>
                        {user.userName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.userId && <p className="text-destructive">{errors.userId.message}</p>}
              </div>

              <div className="col-span-2">
                <Label>Select Entities</Label>
                <div className="grid grid-cols-2 gap-2">
                  {menuItems.map((menu) =>
                    menu.child?.map((entity) => (
                      <div key={entity.title} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedEntities.includes(entity.title)}
                          onChange={() => handleEntityChange(entity.title)}
                        />
                        <Label>{entity.title}</Label>
                      </div>
                    ))
                  )}
                </div>
                {errors.entities && <p className="text-destructive">{errors.entities.message}</p>}
              </div>

              <div className="col-span-2 grid grid-cols-4 gap-2">
                <div>
                  <input type="checkbox" {...register("canCreate")} />
                  <Label>Can Create</Label>
                </div>
                <div>
                  <input type="checkbox" {...register("canRead")} />
                  <Label>Can Read</Label>
                </div>
                <div>
                  <input type="checkbox" {...register("canUpdate")} />
                  <Label>Can Update</Label>
                </div>
                <div>
                  <input type="checkbox" {...register("canDelete")} />
                  <Label>Can Delete</Label>
                </div>
              </div>

              <div className="col-span-2">
                <Button type="submit">Submit Form</Button>
              </div>
            </div>
          </form>
        </div>
        <SheetFooter>
          <SheetClose asChild>Footer Content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
