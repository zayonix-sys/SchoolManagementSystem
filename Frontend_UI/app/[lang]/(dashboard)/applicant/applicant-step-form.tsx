import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
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
import DatePicker from "../common/date-picker";

const applicantSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  formBNumber: z.string().min(1, "Form B is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address").optional().default(""),
  applicantAddress: z.string().min(5, "Address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  lastClassId: z.number().min(1, "Last Class Attended is required"),
  admissionClassId: z.number().min(1, "Admission Required In Class is required"),
  motherTounge: z.string().min(1, "Language is required"),
  residenceStatus: z.string().min(1, "Residence Status is required"),
  states: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  phoneNumber: z.string().max(15, "Phone number must be 15 characters long"),
});

type ApplicantFormValues = z.infer<typeof applicantSchema>;

const ApplicantStepForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantSchema),
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [classes, setClasses] = useState<
    { classId: number; className: string }[]
  >([]);

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
    try {
      const response = await addApplicant(data);

      if (response.success) {
        toast.success(`${response.data.firstName} Applicant Added successfully!`);
        reset();
      } else {
        toast.error(`Error: ${response.message || "Something went wrong"}`);
      }
    } catch (error) {
      toast.error("Request Failed");
    }
  };

  const handleError = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the form.");
    }
  };


  return (
    <div className="grid grid-cols-12 gap-4 px-10">
      <form
        className="col-span-12 grid grid-cols-12 gap-4"
        onSubmit={handleSubmit(onSubmit, handleError)}
      >
        {/* First Row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">First Name</label>
          <Input type="text" placeholder="First Name" {...register("firstName")} />
          {errors.firstName && <p className="text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Last Name</label>
          <Input type="text" placeholder="Last Name" {...register("lastName")} />
          {errors.lastName && <p className="text-destructive">{errors.lastName.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Form B Number</label>
          <Input type="text" placeholder="Form B Number" {...register("formBNumber")} />
          {errors.formBNumber && <p className="text-destructive">{errors.formBNumber.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Gender</label>
          <Select onValueChange={(value) =>
                      setValue("gender", (value))
                    }>
            <SelectTrigger>
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-destructive">{errors.gender.message}</p>}
        </div>

        {/* Second Row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Date of Birth</label>
          <Input type="date" {...register("dateOfBirth")}/>
          {errors.dateOfBirth && <p className="text-destructive">{errors.dateOfBirth.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Applicant Address</label>
          <Input type="text" placeholder="Applicant Address" {...register("applicantAddress")} />
          {errors.applicantAddress && (
            <p className="text-destructive">{errors.applicantAddress.message}</p>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Nationality</label>
          <Input type="text" placeholder="Nationality" {...register("nationality")} />
          {errors.nationality && <p className="text-destructive">{errors.nationality.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">State</label>
          <Input type="text" placeholder="State" {...register("states")} />
          {errors.states && <p className="text-destructive">{errors.states.message}</p>}
        </div>

        {/* Third Row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">City</label>
          <Input type="text" placeholder="City" {...register("city")} />
          {errors.city && <p className="text-destructive">{errors.city.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Email</label>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-destructive">{errors.email.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Phone Number</label>
          <Input type="text" placeholder="Phone Number" {...register("phoneNumber")} />
          {errors.phoneNumber && (
            <p className="text-destructive">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Mother Tongue</label>
          <Input type="text" placeholder="Mother Tongue" {...register("motherTounge")} />
          {errors.motherTounge && <p className="text-destructive">{errors.motherTounge.message}</p>}
        </div>

        {/* Fourth Row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Residence Status</label>
          <Input type="text" placeholder="Residence Status" {...register("residenceStatus")} />
          {errors.residenceStatus && (
            <p className="text-destructive">{errors.residenceStatus.message}</p>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Last Class Attended</label>
          <Select onValueChange={(value) =>
                      setValue("lastClassId", parseInt(value))
                    }>
            <SelectTrigger>
              <SelectValue placeholder="Select Last Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.classId} value={cls.classId.toString()}>
                  {cls.className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.lastClassId && <p className="text-destructive">{errors.lastClassId.message}</p>}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label className="text-default-600">Admission Required In Class</label>
          <Select onValueChange={(value) =>
                      setValue("admissionClassId", parseInt(value))
                    }>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.classId} value={cls.classId.toString()}>
                  {cls.className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.admissionClassId && (
            <p className="text-destructive">{errors.admissionClassId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-12 flex justify-end">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantStepForm;
