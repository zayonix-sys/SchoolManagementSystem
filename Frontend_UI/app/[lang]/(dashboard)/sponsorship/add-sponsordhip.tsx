// AddSponsorshipForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { z } from "zod";

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  SponsorshipData,
  addSponsorship,
  fetchSponsorship,
} from "@/services/sponsorshipService";
import { fetchSponsor, SponsorData } from "@/services/sponsorService";
import ClassStudentListTable from "./student-class-wise";
import { fetchStudents, StudentData } from "@/services/studentService";

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

const AddSponsorshipForm: React.FC<SponsorshipListTableProps> = ({
  sponsorship,
}) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [sponsors, setSponsors] = useState<SponsorData[]>([]);
  const [sponsorId, setSponsorId] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<number>(1);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const fixedAmountPerStudent = 1500;

  const totalExpense =
    selectedStudents.length * fixedAmountPerStudent * frequency;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SponsorshipFormValues>({
    resolver: zodResolver(sponsorshipSchema),
  });
  useEffect(() => {
    console.log("selectedStudents Data", selectedStudents);
  }, [students]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sponsorResponse = await fetchSponsor();
        setSponsors(sponsorResponse.data as SponsorData[]);
        const sponsorshipResponse = await fetchSponsorship();
        const sponsoredStudentIds = sponsorshipResponse.data.map(
          (s: SponsorshipData) => s.studentId
        );
        setStudents(
          (await fetchStudents()).data.filter(
            (student) => !sponsoredStudentIds.includes(student.studentId)
          )
        );
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleFrequencyChange = (value: string) => setFrequency(Number(value));
  const handleStudentSelectionChange = (
    students: { studentId: number; classId: number }[]
  ) => setSelectedStudents(students);

  const onSubmit: SubmitHandler<SponsorshipFormValues> = async (data) => {
    const combinedData = selectedStudents.map((student) => ({
      sponsorshipId: 0,
      sponsorId: sponsorId ?? 0,
      classId: student.classId,
      studentId: student.studentId,
      amount: fixedAmountPerStudent * frequency,
      startDate: data.startDate,
      frequency,
    }));

    try {
      for (const sponsorship of combinedData) {
        const response = await addSponsorship(sponsorship);
        if (response.success) {
          toast.success(
            `Sponsorship for student ${sponsorship.studentId} added successfully!`
          );
        } else {
          toast.error(`Error: ${response.message || "Something went wrong"}`);
        }
      }
      reset();
    } catch (error) {
      toast.error("Error submitting sponsorships");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-end space-x-4 m-2">
          <Button>
            <Icon
              icon="heroicons:building-library-solid"
              className="w-6 h-6 mr-2"
            />
            Add Sponsorship
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Add New Sponsorship</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Select Sponsor</Label>
              <Select onValueChange={(value) => setSponsorId(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sponsor" />
                </SelectTrigger>
                <SelectContent>
                  {sponsors.map((sponsor) => (
                    <SelectItem
                      key={sponsor.sponsorId}
                      value={sponsor.sponsorId.toString()}
                    >
                      {sponsor.sponsorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Total Amount</Label>
              <InputGroup merged>
                <InputGroupText>
                  <Icon icon="mdi:currency-usd" />
                </InputGroupText>
                <Input type="text" value={totalExpense} readOnly />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Frequency of Sponsorship</Label>
              <Select onValueChange={handleFrequencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Select Start Date</Label>
              <Input type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <ClassStudentListTable
                sponsorship={sponsorship}
                onStudentSelectionChange={handleStudentSelectionChange}
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <Button type="submit">Submit Sponsorship</Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddSponsorshipForm;
