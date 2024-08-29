"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Step, StepLabel, Stepper } from "@/components/ui/steps";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addApplicant, ApplicantData } from "@/services/applicantService";
import { ClassData, fetchClasses } from "@/services/ClassService";

const applicantSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  formBNumber: z.string().min(1, "Form B is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email({ message: "Invalid email address" }).optional().default(""),
  applicantAddress: z.string().min(1, "Address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  applicationDate: z.string().min(1, "Date of Application is required"),
  lastClassId: z.number().min(1, "Last Class Attended is required"),
  admissionClassId: z.number().min(1, "Admission Required In Class is required"),
  languages: z.string().min(1, "Language is required"),
  residenceStatus: z.string().min(1, "Residence Status is required"),
  states: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  phoneNumber: z
    .string()
    .max(15, "Phone number must be 15 characters long"),
});

type ApplicantFormValues = z.infer<typeof applicantSchema>;

const VStepForm = () => {

  const { control, register, handleSubmit, reset, setValue, formState: { errors }, } = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantSchema),
  });

  const [classes, setClasses] = useState<ClassData[]>([]);

  useEffect(() => {
    // Fetch the classes from the API
    const loadClasses = async () => {
      try {
        const response = await fetchClasses();
        setClasses(response.data); // Assume response contains an array of class objects
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
          console.log(response.data, "Response")
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

  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = [
    {
      label: "Personal Details",
      content: "Fill in personal details of applicant",
    },
    {
      label: "Contact Information",
      content: "Fill in contact info of applicant",
    },
    // {
    //   label: "Family Details",
    //   content: "Fill in family details of applicant",
    // },
  ];

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (

    <div className="grid grid-cols-12 ms-10 me-10">
      <div className="xl:col-span-3 col-span-10 ">
        <Stepper current={activeStep} direction="vertical">
          {steps.map((label, index) => {
            const stepProps: any = {};
            const labelProps: any = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <StepLabel>Optional</StepLabel>
              );
            }
            return (
              <Step key={label.label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <div className="flex flex-col">
                    <span> <b>{label.label}</b></span>
                    <span> {label.content}</span>
                  </div>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className="col-span-12 xl:col-span-9 me-5">
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className="mt-2 mb-2 font-semibold text-center">
              All steps completed - you&apos;re finished
            </div>
            <div className="flex pt-2">
              <div className=" flex-1" />
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && (
                  <>
                    <div className="col-span-12 ">
                      {/* <h4 className="text-sm font-medium text-default-600">
                        Personal Details
                      </h4> */}
                      {/* <p className="text-xs text-default-600 mt-1">
                        Personal details of applicant.
                      </p> */}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">First Name</label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (<p className="text-destructive">{errors.firstName.message}</p>)}

                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Last Name</label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (<p className="text-destructive">{errors.lastName.message}</p>)}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Form B. Number</label>
                      <Input
                        type="text"
                        placeholder="Form B. Number"
                        {...register("formBNumber")}
                      />
                      {errors.formBNumber && (<p className="text-destructive">{errors.formBNumber.message}</p>)}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Gender</label>
                      <Input
                        type="text"
                        placeholder="Gender"
                        {...register("gender")}
                      />
                      {errors.gender && (<p className="text-destructive">{errors.gender.message}</p>)}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Date of Birth</label>
                      <Input
                        type="date"
                        placeholder="Date of Birth"
                        {...register("dateOfBirth")}
                      />
                      {errors.dateOfBirth && (<p className="text-destructive">{errors.dateOfBirth.message}</p>)}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Last Class Attended</label>
                      <Select
                        onValueChange={(value) =>
                          setValue("lastClassId", parseInt(value))
                        }
                        // {...register("lastClassAttended", {
                        //   setValueAs: (value) => Number(value),  // Convert the value to a number
                        // })}
                        // className="form-select"  // Add your own classes here
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((classItem) => (
                            <SelectItem key={classItem.classId} value={classItem.classId?.toString() ?? ""}>
                              {classItem.className}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.lastClassId && (
                        <p className="text-destructive">{errors.lastClassId.message}</p>
                      )}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Admission Required In Class</label>
                      <Select
                        onValueChange={(value) =>
                          setValue("admissionClassId", parseInt(value))
                        }
                        // {...register("admissionRequiredInClass", {
                        //   setValueAs: (value) => Number(value),  // Convert the value to a number
                        // })}
                        // className="form-select"  // Add your own classes here
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((classItem) => (
                            <SelectItem key={classItem.classId} value={classItem.classId?.toString() ?? ""}>
                              {classItem.className}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.admissionClassId && (
                        <p className="text-destructive">{errors.admissionClassId.message}</p>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Date Of Application</label>
                      <Input
                        type="date"
                        placeholder="Date of Application"
                        {...register("applicationDate")}
                      />
                      {errors.applicationDate && (<p className="text-destructive">{errors.applicationDate.message}</p>)}
                    </div>

                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <div className="col-span-12 ">
                      {/* <h4 className="text-sm font-medium text-default-600">
                        Enter Your Personal Info
                      </h4> */}
                      {/* <p className="text-xs text-default-600 mt-1">
                        Contact details of applicant.
                      </p> */}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Email</label>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                      />
                      {/* {errors.username && <span>This field is required</span>} */}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Phone / Mobile</label>
                      <Input
                        type="text"
                        placeholder="Contact Number"
                        {...register("phoneNumber")}
                      />
                      {errors.phoneNumber && (<p className="text-destructive">{errors.phoneNumber.message}</p>)}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Residence Status</label>
                      <Input
                        type="text"
                        placeholder="Residence"
                        {...register("residenceStatus")}
                      />
                      {errors.residenceStatus && (<p className="text-destructive">{errors.residenceStatus.message}</p>)}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Nationality</label>
                      <Input
                        type="text"
                        placeholder="Country"
                        {...register("nationality")}
                      />
                      {errors.nationality && (<p className="text-destructive">{errors.nationality.message}</p>)}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">State</label>
                      <Input
                        type="text"
                        placeholder="State/Province"
                        {...register("states")}
                      />
                      {errors.states && (<p className="text-destructive">{errors.states.message}</p>)}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">City</label>
                      <Input
                        type="text"
                        placeholder="City"
                        {...register("city")}
                      />
                      {errors.city && (<p className="text-destructive">{errors.city.message}</p>)}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Language</label>
                      <Input
                        type="text"
                        placeholder="Language"
                        {...register("languages")}
                      />
                      {errors.languages && (<p className="text-destructive">{errors.languages.message}</p>)}
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      <label className="text-default-600">Address</label>
                      <Input
                        type="text"
                        placeholder="Current Address of Applicant"
                        {...register("applicantAddress")}
                      />
                      {errors.applicantAddress && (<p className="text-destructive">{errors.applicantAddress.message}</p>)}
                    </div>
                  </>
                )}

                {/* {activeStep === 2 && (
                  <>
                    <div className="col-span-12 ">
                    </div>
                    <div className="grid col-span-12">
                      {fields.map((item, index) => (
                        <div key={item.id} className="col-span-12">
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                placeholder="First Name of Family Member"
                                {...register(`familyMembers.${index}.fullName`)}
                              />
                              {errors.firstName && (<p className="text-destructive">{errors.firstName.message}</p>)}
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                type="email"
                                placeholder="Email"
                                {...register(`familyMembers.${index}.parentEmail`)}
                              />

                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                type="text"
                                placeholder="Phone Number"
                                {...register(`familyMembers.${index}.parentPhoneNumber`)}
                              />
                              {errors.phoneNumber && (<p className="text-destructive">{errors.phoneNumber.message}</p>)}
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                placeholder="Address"
                                {...register(`familyMembers.${index}.parentAddress`)}
                              />
                              {errors.familyMembers?.[index]?.parentAddress && (
                                <p className="text-destructive">
                                  {errors.familyMembers[index].parentAddress?.message}
                                </p>
                              )}
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Select
                                onValueChange={(value) =>
                                  setValue(`familyMembers.${index}.relationWithApplicant`, value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Relation with Applicant" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="parent">Father</SelectItem>
                                  <SelectItem value="sibling">Mother</SelectItem>
                                  <SelectItem value="spouse">Brother</SelectItem>
                                  <SelectItem value="child">Sister</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.familyMembers?.[index]?.relationWithApplicant && (
                                <p className="text-destructive">
                                  {errors.familyMembers[index].relationWithApplicant?.message}
                                </p>
                              )}
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                placeholder="Qualification"
                                {...register(`familyMembers.${index}.qualification`)}
                              />
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                placeholder="Occupation"
                                {...register(`familyMembers.${index}.occupation`)}
                              />
                              {errors.familyMembers?.[index]?.occupation && (
                                <p className="text-destructive">
                                  {errors.familyMembers[index].occupation?.message}
                                </p>
                              )}
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <Input
                                placeholder="Source of Income"
                                {...register(`familyMembers.${index}.sourceOfIncome`)}
                              />
                              {errors.familyMembers?.[index]?.sourceOfIncome && (
                                <p className="text-destructive">
                                  {errors.familyMembers[index].sourceOfIncome?.message}
                                </p>
                              )}
                            </div>
                            <div className="col-span-12 mb-4">
                              <Button variant="outline" color="destructive" onClick={() => remove(index)}>
                                Delete Member
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-span-12">
                        <Button
                          type="button"
                          className="ps-6 pe-6"
                          variant="outline"
                          color="primary"
                          onClick={() =>
                            append({
                              fullName: '',
                              parentEmail: '',
                              parentPhoneNumber: '',
                              parentAddress: '',
                              relationWithApplicant: '',
                              qualification: '',
                              occupation: '',
                              sourceOfIncome: '',
                            })
                          }
                        >
                          Add Member
                        </Button>
                      </div>
                    </div>
                  </>

                )} */}
              </div>


              <div className="flex pt-2 ">
                <Button
                  size="xs"
                  variant="outline"
                  color="secondary"
                  className={cn("cursor-pointer", {
                    hidden: activeStep === 0,
                  })}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <div className="flex-1	gap-4 " />
                <div className="flex	gap-2 ">
                  {activeStep === steps.length - 1 ? (
                    <Button
                      size="xs"
                      variant="outline"
                      color="success"
                      className="cursor-pointer"
                      type="submit"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      size="xs"
                      variant="outline"
                      color="secondary"
                      className="cursor-pointer"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default VStepForm;
