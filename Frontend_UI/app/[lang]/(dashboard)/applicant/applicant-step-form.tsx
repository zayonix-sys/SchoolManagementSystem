import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addApplicant } from "@/services/applicantService";
import { fetchClasses } from "@/services/ClassService";
import { CampusData, getCampuses } from "@/services/campusService";
import { format } from "date-fns";

const applicantSchema = z.object({
  applicantId: z.number().optional(),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  formBNumber: z.string().min(1, "Form B is required"),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of Birth is required" })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    })
    .transform((value) => format(new Date(value), "yyyy-MM-dd")),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address").optional().default(""),
  applicantAddress: z.string().min(5, "Address is required"),
  residenceStatus: z.string().min(1, "Residence Status is required"),
  city: z.string().min(1, "City is required"),
  motherTounge: z.string().min(1, "Language is required"),
  states: z.string().min(1, "State is required"),
  lastClassId: z.number().min(1, "Last Class Attended is required"),
  admissionClassId: z
    .number()
    .min(1, "Admission Required In Class is required"),
  campusId: z.number().min(1, "Campus is required"),
  applicationId: z.number().optional(),
  applicationStatus: z.string().optional().default("Pending"),
  admissionDecisionDate: z.string().optional(),
  remarks: z.string().optional(),
  // createdAt: z.string().optional(),
  // createdBy: z.number().optional(),
  // updatedAt: z.string().optional(),
  // updatedBy: z.number().optional(),
  // isActive: z.boolean().optional().default(true),
  phoneNumber: z.string().max(15, "Phone number must be 15 characters long"),
});

type ApplicantFormValues = z.infer<typeof applicantSchema>;

const ApplicantStepForm = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      gender: "male",
    },
  });

  const [classes, setClasses] = useState<
    { classId: number; className: string }[]
  >([]);
  const [campuses, setCampuses] = useState<CampusData[]>([]);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await fetchClasses();
        setClasses(response.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    loadClasses();
    const fetchCampuses = async () => {
      try {
        const campuses = await getCampuses();
        setCampuses(campuses.data as CampusData[]);
      } catch (err) {
        console.error("Failed to fetch campuses:", err);
      }
    };

    fetchCampuses();
  }, []);

  const onSubmit: SubmitHandler<ApplicantFormValues> = async (data) => {
    try {
      const response = await addApplicant(data);
      if (response.success) {
        toast.success(
          `${response.data.firstName} Applicant Added successfully!`
        );
        reset();
        //setStep(1); // Reset to first step after submission
      } else {
        toast.error(`Error: ${response.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Request Failed");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="col-span-12 xl:col-span-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 justify-center">
            <>
              <div className="col-span-12">
                <h4 className="text-sm font-medium text-default-600">
                  Applicant Details
                </h4>
                <p className="text-xs text-default-600 mt-1">
                  Fill in the information below
                </p>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">First Name</label>
                <Input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Last Name</label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-destructive">{errors.lastName.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Form B Number</label>
                <Input
                  type="text"
                  placeholder="Form B Number"
                  {...register("formBNumber")}
                />
                {errors.formBNumber && (
                  <p className="text-destructive">
                    {errors.formBNumber.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Gender</label>
                <Select
                  defaultValue="male"
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-destructive">{errors.gender.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Date of Birth</label>
                <Input type="date" {...register("dateOfBirth")} />
                {errors.dateOfBirth && (
                  <p className="text-destructive">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </>
            <>
              <div className="col-span-12">
                <h4 className="text-sm font-medium text-default-600">
                  Contact Infromation
                </h4>
                <p className="text-xs text-default-600 mt-1">
                  Fill in the information below
                </p>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Applicant Address</label>
                <Input
                  type="text"
                  placeholder="Applicant Address"
                  {...register("applicantAddress")}
                />
                {errors.applicantAddress && (
                  <p className="text-destructive">
                    {errors.applicantAddress.message}
                  </p>
                )}
              </div>
              {/* <div className="col-span-12 md:col-span-6 lg:col-span-3">
                      <label className="text-default-600">Nationality</label>
                      <Input
                        type="text"
                        placeholder="Nationality"
                        {...register("nationality")}
                      />
                      {errors.nationality && (
                        <p className="text-destructive">
                          {errors.nationality.message}
                        </p>
                      )}
                    </div> */}
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">State</label>
                <Input
                  type="text"
                  placeholder="State"
                  {...register("states")}
                />
                {errors.states && (
                  <p className="text-destructive">{errors.states.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">City</label>
                <Input type="text" placeholder="City" {...register("city")} />
                {errors.city && (
                  <p className="text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Phone Number</label>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-destructive">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Residence Status</label>
                <Input
                  type="text"
                  placeholder="Residence Status"
                  {...register("residenceStatus")}
                />
                {errors.residenceStatus && (
                  <p className="text-destructive">
                    {errors.residenceStatus.message}
                  </p>
                )}
              </div>
            </>
            <>
              <div className="col-span-12">
                <h4 className="text-sm font-medium text-default-600">
                  Previous and Desired Education
                </h4>
                <p className="text-xs text-default-600 mt-1">
                  Fill in the information below
                </p>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Admission Campus</label>
                <Select
                  onValueChange={(value) => setValue("campusId", Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Campus" />
                  </SelectTrigger>
                  <SelectContent>
                    {campuses.map((c) => (
                      <SelectItem
                        className="hover:bg-default-300"
                        key={c?.campusId}
                        value={c.campusId ? c.campusId.toString() : ""}
                      >
                        {c?.campusName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.campusId && (
                  <p className="text-destructive">{errors.campusId.message}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Last Class Attended</label>
                <Select
                  onValueChange={(value) =>
                    setValue("lastClassId", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Last Class Attended" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem
                        className="hover:bg-default-300"
                        key={c.classId}
                        value={c.classId.toString()}
                      >
                        {c.className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.lastClassId && (
                  <p className="text-destructive">
                    {errors.lastClassId.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Admission Class</label>
                <Select
                  onValueChange={(value) =>
                    setValue("admissionClassId", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Admission Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem
                        className="hover:bg-default-300"
                        key={c.classId}
                        value={c.classId.toString()}
                      >
                        {c.className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.admissionClassId && (
                  <p className="text-destructive">
                    {errors.admissionClassId.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <label className="text-default-600">Mother Tongue</label>
                <Input
                  type="text"
                  placeholder="Mother Tongue"
                  {...register("motherTounge")}
                />
                {errors.motherTounge && (
                  <p className="text-destructive">
                    {errors.motherTounge.message}
                  </p>
                )}
              </div>
            </>
          </div>

          <div className="flex pt-2">
            <div className="flex-1	gap-4 " />
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="outline"
                color="success"
                className="cursor-pointer"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicantStepForm;
