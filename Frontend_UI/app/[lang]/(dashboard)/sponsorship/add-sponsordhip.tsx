"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
import { ClassData, fetchClasses } from "@/services/ClassService";
import ClassStudentListTable from "./student-class-wise";
import { addSponsorship, SponsorshipData } from "@/services/sponsorshipService";
import { fetchSponsor, SponsorData } from "@/services/sponsorService";

const sponsorshipSchema = z.object({
  amount: z.string().min(1, "Please Enter Correct Amount").optional(),
  startDate: z.string().date().optional(),
  frequency: z.string().min(1, "Frequency is required").optional(),
  classId: z.number().optional(),
  studentId: z.number().optional(),
  sponsorId: z.number().optional(),
});

type SponsorshipFormValues = z.infer<typeof sponsorshipSchema>;
interface SponsorshipListTableProps {
  sponsorship: SponsorshipData[];
}


const AddSponsorshipForm: React.FC<SponsorshipListTableProps> = ({ sponsorship }) =>{
  const [classes, setClasses] = useState<ClassData[]>([]); 
  const [sponsors, setSponsors] = useState<SponsorData[]>([]); 
  const [classId, setClassId] = useState<number | null>(null);
  const [sponsorId, setSponsorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SponsorshipFormValues>({
    resolver: zodResolver(sponsorshipSchema),
  });

  useEffect(() => {
    const fetchClassSponsorData = async () => {
      setLoading(true);
      try {
        const classResponse = await fetchClasses(); 
        setClasses(classResponse.data as ClassData[]);
        const sponsorResponse = await fetchSponsor();
        setSponsors(sponsorResponse.data as SponsorData[]); 
          console.log(sponsorResponse,"sponsor Response");
          
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchClassSponsorData();
  }, []);

  const onSubmit: SubmitHandler<SponsorshipFormValues> = async (data) => { 
    const combinedData: SponsorshipData = {
      sponsorshipId: 0, 
      studentId: studentId ?? 0, 
      classId: classId ?? 0,
      sponsorId: sponsorId ?? 0, 
      amount: data.amount, 
      startDate: data.startDate, 
      frequency: data.frequency, 
    };
console.log(combinedData,"combine Data");

    const response = await addSponsorship(combinedData); 
  
    if (response.success) {
      toast.success(`Sponsorship added successfully!`);
      reset();
    } else {
      toast.error(`Error: ${response.message || "Something went wrong"}`);
    }
  };

  const handleStudentIdChange = (id: number) => {
    setStudentId(id);
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
            Add Sponsorship
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="" side='top'>
        <SheetHeader>
          <SheetTitle>Add New Sponsorship</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-1">
              <Label>Select Class</Label>
              <Select onValueChange={(value) => setClassId(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map((cd) => (
                    <SelectItem key={cd.classId} value={cd.classId.toString()}>
                      {cd.className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
        <div className="flex flex-col gap-2 col-span-1">
              <Label>Select Sponsor</Label>
              <Select onValueChange={(value) => setSponsorId(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sponsor" />
                </SelectTrigger>
                <SelectContent>
                  {sponsors?.map((cd) => (
                    <SelectItem key={cd.sponsorId} value={cd.sponsorId.toString()}>
                      {cd.sponsorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Enter Amount</Label>
              <InputGroup merged>
                <InputGroupText>
                  <Icon icon="mdi:money" />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Enter Your Amount"
                  id="amount"
                  {...register("amount")}
                />
              </InputGroup>
              {errors.amount && (
                <p className="text-destructive">{errors.amount.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="frequency">Frequency of Sponsorship</Label>
              <Select onValueChange={(value) => setValue("frequency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Bi-Annually">Bi-Annually</SelectItem>
                  <SelectItem value="Annually">Annually</SelectItem>
                </SelectContent>
              </Select>
              {errors.frequency && (
                <p className="text-destructive">{errors.frequency.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Select Start Date</Label>
              <InputGroup merged className="flex">
                <InputGroupText>
                  <Icon icon="material-symbols:calendar-today" />
                </InputGroupText>
                <Input
                  type="date"
                  id="startDate"
                  {...register("startDate")}
                />
              </InputGroup>
              {errors.startDate && (
                <p className="text-destructive">{errors.startDate.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <ClassStudentListTable sponsorship={sponsorship} classId={classId} onStudentIdChange={handleStudentIdChange} />
            </div>

            <div className="col-span-2">
              {/* <Button type="submit">Submit Form</Button> */}
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

export default AddSponsorshipForm;
