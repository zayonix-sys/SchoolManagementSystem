import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Step, StepLabel, Stepper } from "@/components/ui/steps";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addApplicant } from "@/services/applicantService";
import { fetchClasses } from "@/services/ClassService";
import DatePicker from "../common/date-picker";
import { watch } from "fs";

const applicantSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  formBNumber: z.string().min(1, "Form B is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address").optional().default(""),
  applicantAddress: z.string().min(5, "Address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  applicationDate: z.string().min(1, "Date of Application is required"),
  lastClassId: z.number().min(1, "Last Class Attended is required"),
  admissionClassId: z
    .number()
    .min(1, "Admission Required In Class is required"),
  motherTounge: z.string().min(1, "Language is required"),
  residenceStatus: z.string().min(1, "Residence Status is required"),
  states: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  phoneNumber: z.string().max(15, "Phone number must be 15 characters long"),
});

type ApplicantFormValues = z.infer<typeof applicantSchema>;

const ApplicantStepForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantSchema),
    mode: "onBlur",
  });

  const [classes, setClasses] = useState<
    { classId: number; className: string }[]
  >([]);
  const [activeStep, setActiveStep] = React.useState<number>(0);

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
  }, []);

  const onSubmit: SubmitHandler<ApplicantFormValues> = async (data) => {
    console.log("Submitting form with data:", data);
    try {
      const response = await addApplicant(data);

      if (response.success) {
        if (Array.isArray(response.data)) {
          console.log("Received response:", response.data);
          toast.success(
            `${response.data[0].firstName} Applicant Added successfully!`
          );
          console.log(response.data, "Response");
        } else {
          toast.success(
            `${response.data.firstName} Applicant Added successfully!`
          );
        }
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

  const steps = [
    {
      label: "Personal Details",
      content: "Fill in personal details of applicant",
    },
    {
      label: "Contact Information",
      content: "Fill in contact info of applicant",
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return (
    <div className="grid grid-cols-12 ms-10 me-10">
      <div className="xl:col-span-3 col-span-10">
        <Stepper current={activeStep} direction="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <div className="flex flex-col">
                  <span>
                    <b>{step.label}</b>
                  </span>
                  <span>{step.content}</span>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="col-span-12 xl:col-span-9 me-5">
        {activeStep === steps.length ? (
          <>
            <div className="mt-2 mb-2 font-semibold text-center">
              All steps completed - you&apos;re finished
            </div>
            <div className="flex pt-2">
              <div className="flex-1" />
              <Button
                size="xs"
                variant="outline"
                color="destructive"
                className="cursor-pointer"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && (
                  <>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">First Name</label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-destructive">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Last Name</label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-destructive">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
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

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Gender</label>
                      <Select {...register("gender")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && (
                        <p className="text-destructive">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">
                        Last Class Attended
                      </label>
                      <Select {...register("lastClassId")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Last Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem
                              key={cls.classId}
                              value={cls.classId.toString()}
                            >
                              {cls.className}
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
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">
                        Admission Required In Class
                      </label>
                      <Select {...register("admissionClassId")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Admission Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem
                              key={cls.classId}
                              value={cls.classId.toString()}
                            >
                              {cls.className}
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
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Date of Birth</label>
                      <DatePicker {...register("dateOfBirth")} />
                      {errors.dateOfBirth && (
                        <p className="text-destructive">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">
                        Applicant Address
                      </label>
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
                    <div className="col-span-12 lg:col-span-4">
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
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">State</label>
                      <Input
                        type="text"
                        placeholder="State"
                        {...register("states")}
                      />
                      {errors.states && (
                        <p className="text-destructive">
                          {errors.states.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">City</label>
                      <Input
                        type="text"
                        placeholder="City"
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="text-destructive">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Email</label>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
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
                    <div className="col-span-12 lg:col-span-4">
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
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">
                        Residence Status
                      </label>
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
                )}
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    color="default"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    color="default"
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                  >
                    Next
                  </Button>
                  {activeStep === steps.length - 1 && (
                    <Button type="submit" size="sm" color="primary">
                      Submit
                    </Button>
                  )}
                </div>
                {/* {activeStep === 2 && <></>} */}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantStepForm;
