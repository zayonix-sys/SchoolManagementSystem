"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addUserRole } from "@/services/userRoleService";




const userRoleSchema = z.object({
  roleName: z.string().min(1, "Role Name is required"),
  roleDescription: z.string().optional(),
});

type UserRoleFormValues = z.infer<typeof userRoleSchema>;

export default function AddUserRole() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRoleFormValues>({
    resolver: zodResolver(userRoleSchema),
  });

  const onSubmit: SubmitHandler<UserRoleFormValues> = async (data) => {
    try {
      const response = await addUserRole(data);

      if (response.success) {
        const roleName = Array.isArray(response.data)
          ? response.data[0].roleName
          : response.data.roleName;
        toast.success(`${roleName} Role Added successfully!`);
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

  const handleError = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the form.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <span className="text-xl mr-1">
            <Icon icon="heroicons:building-library-solid" className="w-6 h-6 mr-2" />
          </span>
          Add User Role
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Role</SheetTitle>
        </SheetHeader>
        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Role Name"
                    {...register("roleName")}
                  />
                  {errors.roleName && (
                    <p className="text-destructive">
                      {errors.roleName.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Textarea
                    placeholder="Role Description"
                    {...register("roleDescription")}
                  />
                  {errors.roleDescription && (
                    <p className="text-destructive">
                      {errors.roleDescription.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Button type="submit">Submit Form</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}