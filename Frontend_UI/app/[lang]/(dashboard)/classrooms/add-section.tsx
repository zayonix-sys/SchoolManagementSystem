"use client";
import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addSection } from "../../../../services/SectionService";

// Zod schema definition
const sectionSchema = z.object({
  sectionName: z.string().min(1, "Section Name is required"),
  classId: z.number().min(1, "Class is required"),
  capacity: z.number().min(1, "Capacity is required").max(999),
});

type SectionFormValues = z.infer<typeof sectionSchema>;

export default function AddSection() {
  const [classes, setClasses] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
  });

  useEffect(() => {
    // Fetch classes from the database
    async function fetchClasses() {
      try {
        const response = await fetch("/api/Class/GetClass");
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    }

    fetchClasses();
  }, []);

  const onSubmit: SubmitHandler<SectionFormValues> = async (data) => {
    try {
      const response = await addSection(data);

      if (response.success) {
        toast.success(`${response.data.sectionName} Section Added successfully!`);
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
          Add Section
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Section</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Section Name"
                    {...register("sectionName")}
                  />
                  {errors.sectionName && (
                    <p className="text-destructive">{errors.sectionName.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <Select
                    onValueChange={(value) => setValue("classId", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classItem) => (
                        <SelectItem
                          key={classItem.classId}
                          value={classItem.classId.toString()}
                        >
                          {classItem.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.classId && (
                    <p className="text-destructive">{errors.classId.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Capacity"
                    {...register("capacity", { valueAsNumber: true })}
                  />
                  {errors.capacity && (
                    <p className="text-destructive">{errors.capacity.message}</p>
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
