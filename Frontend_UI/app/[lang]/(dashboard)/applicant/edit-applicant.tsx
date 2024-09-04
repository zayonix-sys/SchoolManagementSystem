"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicantData, updateApplicant } from "@/services/applicantService";

const applicantSchema = z.object({
  formBNumber: z.string().min(1, "Form B Number is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"), // Consider adding date validation
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long"),
  applicantAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  applicationStatus: z.string().min(1, "Status is required"),
  states: z.string().min(1, "The States field is required."),
  motherTounge: z.string().min(1, "The MotherTounge field is required."),
  residenceStatus: z.string().min(1, "The ResidenceStatus field is required."),
});

type ApplicantFormValues = z.infer<typeof applicantSchema>;

export default function EditApplicant({ applicantData }: { applicantData: ApplicantData }) {
  const {
    applicantId,
    formBNumber,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phoneNumber,
    applicantAddress,
    city,
    applicationStatus,
    states,
    motherTounge,
    residenceStatus,
  } = applicantData;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      formBNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      applicantAddress,
      city,
      applicationStatus,
      states,
      motherTounge,
      residenceStatus,
    },
  });

  const onSubmit: SubmitHandler<ApplicantFormValues> = async (data) => {
    try {
      const updatedApplicant = { ...data, applicantId };
      const response = await updateApplicant(updatedApplicant);

      if (response.success) {
        toast.success(`${updatedApplicant.firstName} Applicant Updated successfully!`);
        reset();
      } else {
        toast.error("Failed to update the Applicant");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Request failed");
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
        <Button size="icon" variant="outline" className="h-7 w-7">
          <Icon icon="heroicons:pencil" className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Edit Applicant</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Form B Number"
                    {...register("formBNumber")}
                  />
                  {errors.formBNumber && (
                    <p className="text-destructive">{errors.formBNumber.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Date of Birth"
                    {...register("dateOfBirth")}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-destructive">{errors.dateOfBirth.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Select
                    defaultValue={gender ?? ""}
                    onValueChange={(value) => setValue("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-destructive">{errors.gender.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <p className="text-destructive">{errors.phoneNumber.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Address"
                    {...register("applicantAddress")}
                  />
                  {errors.applicantAddress && (
                    <p className="text-destructive">{errors.applicantAddress.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-destructive">{errors.city.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Select
                    defaultValue={applicationStatus ?? ""}
                    onValueChange={(value) => setValue("applicationStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.applicationStatus && (
                    <p className="text-destructive">{errors.applicationStatus.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="States"
                    {...register("states")}
                  />
                  {errors.states && (
                    <p className="text-destructive">{errors.states.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Mother Tounge"
                    {...register("motherTounge")}
                  />
                  {errors.motherTounge && (
                    <p className="text-destructive">{errors.motherTounge.message}</p>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-1">
                <Input
                    type="text"
                    placeholder="Residence Status"
                    {...register("residenceStatus")}
                  />
                  {errors.residenceStatus && (
                    <p className="text-destructive">{errors.residenceStatus.message}</p>
                  )}
                </div>
              </div>
              <SheetFooter className="mt-6">
                <SheetClose asChild>
                  <Button type="submit">Update</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
