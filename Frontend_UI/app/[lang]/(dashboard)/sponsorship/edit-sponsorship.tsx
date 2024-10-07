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
import { updateSponsorship, SponsorshipData } from "@/services/sponsorshipService";
import { fetchSponsor, SponsorData } from "@/services/sponsorService";

const sponsorshipSchema = z.object({
  amount: z.string().min(1, "Please Enter Correct Amount").optional(),
  startDate: z.string().optional(),
  frequency: z.string().min(1, "Frequency is required").optional(),
  classId: z.number().optional(),
  studentId: z.number().optional(),
  sponsorId: z.number().optional(),
});

type SponsorshipFormValues = z.infer<typeof sponsorshipSchema>;

interface EditSponsorshipFormProps {
  existingSponsorship: SponsorshipData;
  studentName: string; 
}

const EditSponsorshipForm: React.FC<EditSponsorshipFormProps> = ({ existingSponsorship, studentName }) => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [sponsors, setSponsors] = useState<SponsorData[]>([]);
  const [classId, setClassId] = useState<number | null>(existingSponsorship.classId || null);
  const [sponsorId, setSponsorId] = useState<number | null>(existingSponsorship.sponsorId || null);
  const [studentId] = useState<number | null>(existingSponsorship.studentId || null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SponsorshipFormValues>({
    resolver: zodResolver(sponsorshipSchema),
    defaultValues: {
      amount: existingSponsorship.amount || "",
      startDate: existingSponsorship.startDate || "",
      frequency: existingSponsorship.frequency || "",
      classId: existingSponsorship.classId || undefined,
      studentId: existingSponsorship.studentId || undefined,
      sponsorId: existingSponsorship.sponsorId || undefined,
    },
  });

  useEffect(() => {
    const fetchClassSponsorData = async () => {
      try {
        const classResponse = await fetchClasses();
        setClasses(classResponse.data as ClassData[]);
        const sponsorResponse = await fetchSponsor();
        setSponsors(sponsorResponse.data as SponsorData[]);
      } catch (err) {
        toast.error("Error loading class and sponsor data.");
      }
    };

    fetchClassSponsorData();
  }, []);

  useEffect(() => {
    
    setValue("amount", existingSponsorship.amount || "");
    setValue("startDate", existingSponsorship.startDate || "");
    setValue("frequency", existingSponsorship.frequency || "");
    setClassId(existingSponsorship.classId || null);
    setSponsorId(existingSponsorship.sponsorId || null);
  }, [existingSponsorship, setValue]);

  const onSubmit: SubmitHandler<SponsorshipFormValues> = async (data) => {
    const updatedData: SponsorshipData = {
      sponsorshipId: existingSponsorship.sponsorshipId, // Keep sponsorship ID
      studentId: studentId ?? 0, // Keep the same student ID
      classId: classId ?? 0,
      sponsorId: sponsorId ?? 0,
      amount: data.amount,
      startDate: data.startDate,
      frequency: data.frequency,
    };

    const response = await updateSponsorship(updatedData);

    if (response.success) {
      toast.success("Sponsorship updated successfully!");
    } else {
      toast.error(`Error: ${response.message || "Something went wrong"}`);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="h-7 w-7">
          <Icon icon="heroicons:pencil" className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Edit Sponsorship</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 col-span-1">
              <Label>Select Class</Label>
              <Select onValueChange={(value) => setClassId(parseInt(value))} defaultValue={classId?.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cd) => (
                    <SelectItem key={cd.classId} value={cd.classId.toString()}>
                      {cd.className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 col-span-1">
              <Label>Select Sponsor</Label>
              <Select onValueChange={(value) => setSponsorId(parseInt(value))} defaultValue={sponsorId?.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sponsor" />
                </SelectTrigger>
                <SelectContent>
                  {sponsors.map((s) => (
                    <SelectItem key={s.sponsorId} value={s.sponsorId.toString()}>
                      {s.sponsorName}
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
              {errors.amount && <p className="text-destructive">{errors.amount.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="frequency">Frequency of Sponsorship</Label>
              <Select onValueChange={(value) => setValue("frequency", value)} defaultValue={existingSponsorship.frequency || ""}>
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
              {errors.frequency && <p className="text-destructive">{errors.frequency.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Sponsored Student</Label>
              
              <InputGroup>
                <InputGroupText>
                  <Icon icon="mdi:account" />
                </InputGroupText>
                <Input value={studentName} disabled className="text-dark text-base"/>
              </InputGroup>
            </div>

            <div className="col-span-2">
              <Button type="submit">Submit Form</Button>
            </div>
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditSponsorshipForm;
