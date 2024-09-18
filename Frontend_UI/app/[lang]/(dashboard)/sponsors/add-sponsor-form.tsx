"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const sponsorSchema = z.object({
  sponsorName: z.string().min(1, "Full Name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  gender: z.string().min(1, "Gender is required"),
  occupation: z.string().min(1, "Occupation is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(3, "Postal Code is required"),
  address: z.string().min(1, "Address is required"),
});

type SponsorFormValues = z.infer<typeof sponsorSchema>;

const AddSponsorForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorSchema),
  });

  const onSubmit: SubmitHandler<SponsorFormValues> = async (data) => {
    // Add your submit logic here
    // Example:
    // const response = await addEmployee(data);
    // if (response.success) {
    //   toast.success(`Sponsor ${data.sponsorName} added successfully!`);
    //   reset();
    // } else {
    //   toast.error(`Error: ${response.message || "Something went wrong"}`);
    // }
  };

  const handleError = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the form.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-end space-x-4 m-2">
          <Button>
            <span className="text-xl mr-1">
              <Icon
                icon="heroicons:building-library-solid"
                className="w-6 h-6 mr-2"
              />
            </span>
            Add Sponsor
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Sponsor</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="viFullName3">Full Name</Label>
              <InputGroup merged>
                <InputGroupText>
                  <Icon icon="mdi:user" />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Your Full Name"
                  id="viFullName3"
                  {...register("sponsorName")}
                  />
              </InputGroup>
                  {errors.sponsorName && (
                    <p className="text-destructive">
                      {errors.sponsorName.message}
                    </p>
                  )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="viEmail3">Email Address</Label>
              <InputGroup merged>
                <InputGroupText>
                  <Icon icon="ic:outline-email" />
                </InputGroupText>
                <Input
                  type="email"
                  placeholder="Your email"
                  id="viEmail3"
                  {...register("email")}
                />
              </InputGroup>
                {errors.email && (
                  <p className="text-destructive">{errors.email.message}</p>
                )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="Gender">Gender</Label>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger>
                  <Icon icon="foundation:male-female" />
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex items-center space-x-2">
                    <Icon icon="fa:male" />
                    <SelectItem value="male">Male</SelectItem>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon icon="fa:female" />
                    <SelectItem value="female">Female</SelectItem>
                  </div>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-destructive">{errors.gender.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Select onValueChange={(value) => setValue("occupation", value)}>
                <SelectTrigger>
                  <Icon icon="fa:user-md" />
                  <SelectValue placeholder="Select Occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="own-business">Own Business</SelectItem>
                  <SelectItem value="govt-job">Government Job</SelectItem>
                  <SelectItem value="pvt-job">Private Job</SelectItem>
                </SelectContent>
              </Select>
              {errors.occupation && (
                <p className="text-destructive">{errors.occupation.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="viPhone3">Phone Number</Label>
              <InputGroup merged className="flex">
                <InputGroupText>
                  <Icon icon="tdesign:call" />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Type number"
                  id="viPhone3"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-destructive">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </InputGroup>
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="turkey">Turkey</SelectItem>
                  <SelectItem value="hungry">Hungary</SelectItem>
                  <SelectItem value="ireland">Ireland</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-destructive">{errors.country.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="state">State</Label>
              <Select onValueChange={(value) => setValue("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alberta">Alberta</SelectItem>
                  <SelectItem value="british">British Columbia</SelectItem>
                  <SelectItem value="manitoba">Manitoba</SelectItem>
                  <SelectItem value="brunswick">New Brunswick</SelectItem>
                  <SelectItem value="ontario">Ontario</SelectItem>
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-destructive">{errors.state.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="city">City</Label>
              <Select onValueChange={(value) => setValue("city", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karachi">Karachi</SelectItem>
                  <SelectItem value="lahore">Lahore</SelectItem>
                  <SelectItem value="islamabad">Islamabad</SelectItem>
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-destructive">{errors.city.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <InputGroup merged className="flex">
                <InputGroupText>
                  <Icon icon="ic:baseline-mail" />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Type Postal Code"
                  id="postalCode"
                  {...register("postalCode")}
                  />
                  </InputGroup>
                {errors.postalCode && (
                  <p className="text-destructive">
                    {errors.postalCode.message}
                  </p>
                )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <InputGroup merged className="flex">
                <InputGroupText>
                  <Icon icon="material-symbols:home" />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Type Address"
                  id="address"
                  {...register("address")}
                />
                  </InputGroup>
                {errors.address && (
                  <p className="text-destructive">{errors.address.message}</p>
                )}
            </div>
            <div className="col-span-2">
              <Button type="submit">Submit Form</Button>
            </div>
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddSponsorForm;
