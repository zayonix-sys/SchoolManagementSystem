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
import ClassStudentListTable from "./student-class-wise";
import { ClassData } from "@/services/ClassService";
import { fetchSponsor, SponsorData } from "@/services/sponsorService";
import { StudentData } from "@/services/studentService";



const sponsorshipSchema = z.object({
  amount: z.string().min(1, "Please Enter Correct Amount").optional(),
  startDate: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
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
  const [frequency, setFrequency] = useState<number>(1);
  const [selectedStudents, setSelectedStudents] = useState<{ studentId: number; classId: number | null }[]>([]);

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
    const fetchData = async () => {
      try {
        const sponsorResponse = await fetchSponsor();
        setSponsors(sponsorResponse.data as SponsorData[]);

        const sponsorshipResponse = await fetchSponsorship();
        const sponsoredStudentIds = sponsorshipResponse.data.map(
          (s: SponsorshipData) => s.studentId
        );

        const studentResponse = await fetchStudents();
        setStudents(
          studentResponse.data.filter(
            (student: StudentData) =>
              !sponsoredStudentIds.includes(student.studentId)
          )
        );
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleFrequencyChange = (value: string) => setFrequency(Number(value));

  const handleStudentSelectionChange = (selectedStudents: { studentId: number; classId: number | null }[]) => {
    setSelectedStudents(selectedStudents);
    console.log("Selected Students:", selectedStudents);
  };

  const onSubmit: SubmitHandler<SponsorshipFormValues> = async (data) => {
    if (!sponsorId) {
      toast.error("Please select a sponsor");
      return;
    }

    const combinedData = selectedStudents
      .map((selectedStudent) => {
        const student = students.find((s) => s.studentId === selectedStudent.studentId);

        if (!student) {
          toast.error(`Student with ID ${selectedStudent.studentId} not found`);
          return null;
        }

        return {
          sponsorshipId: 0,
          sponsorId,
          classId: student.classId ?? 0,
          studentId: selectedStudent.studentId,
          amount: fixedAmountPerStudent * frequency,
          startDate: data.startDate,
          frequency,
        };
      })
      .filter(Boolean);

    try {
      for (const sponsorship of combinedData) {
        const response = await addSponsorship(sponsorship!); // `!` since we filtered `null` earlier
        if (response.success) {
          toast.success(`Sponsorship for student added successfully!`);
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
                      value={sponsor.sponsorId?.toString() ?? ""}
                    >
                      {sponsor.sponsorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Enter Amount</Label>
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
