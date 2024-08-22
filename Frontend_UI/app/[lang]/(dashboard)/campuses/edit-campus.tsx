"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import{ addCampus, CampusData, getCampusById } from "../../../../services/campusService"; 

// Define Zod schema
const campusSchema = z.object({
  campusName: z.string().min(1, "Campus Name is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Campus Name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(5, "Zip Code is required").regex(/^\d{5}$/, "Invalid Zip Code"),
  phoneNumber: z.string(),
  email: z.string().email(),
});

type CampusFormValues = z.infer<typeof campusSchema>;

export default function EditCampus({ campusId }: { campusId: number | undefined }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CampusFormValues>({
    resolver: zodResolver(campusSchema),
  });
  const [campus, setCampus] = useState<CampusData>();
  

  useEffect(() => {
    const fetchCampusById = async () => {
      // setLoading(true);
      try {
        const data = await getCampusById(campusId);
        setCampus(data);
        console.log(campus);
      } catch (err) {
        //setError(err);
      } finally {
        //setLoading(false);
      }
    };

    fetchCampusById();
  }, []);
  
  const onSubmit: SubmitHandler<CampusFormValues> = async data => {
    let response;
    try
    {
      // Send data to backend Api using campusService
      const response = await addCampus(data);  
      console.log(response)
      if (response != null) {
        // Handle successful response
        console.log("Success:", response);
        toast.success( response.campusName + " Campus Added  successfully!");
        reset();
      } else {
        // Handle errors from server
        console.error("Error:", response);
      }
    }
    catch (error)
    {
      toast.error("Request Failed", response);
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
          <span className='text-xl mr-1'>
            <Icon icon="heroicons:pencil-square" className="w-6 h-6 mr-2" />
          </span>
          Edit Campus
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Edit Campus</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Campus Name"
                    {...register("campusName")}
                  />
                  {errors.campusName && <p className="text-destructive">{errors.campusName.message}</p>}
                </div>
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                  />
                  {errors.address && <p className="text-destructive">{errors.address.message}</p>}
                </div>
                <div className="col-span-3 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Country"
                    {...register("country")}
                  />
                  {errors.country && <p className="text-destructive">{errors.country.message}</p>}
                </div>
                <div className="col-span-3 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="State"
                    {...register("state")}
                  />
                  {errors.state && <p className="text-destructive">{errors.state.message}</p>}
                </div>
                <div className="col-span-3 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                  />
                  {errors.city && <p className="text-destructive">{errors.city.message}</p>}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="number"
                    placeholder="Zip Code"
                    {...register("postalCode")}
                  />
                  {errors.postalCode && <p className="text-destructive">{errors.postalCode.message}</p>}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && <p className="text-destructive">{errors.phoneNumber.message}</p>}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-destructive">{errors.email.message}</p>}
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
