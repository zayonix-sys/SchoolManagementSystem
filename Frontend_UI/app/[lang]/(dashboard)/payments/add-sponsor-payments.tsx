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
import {
  fetchSponsorship,
  fetchStudentBySponsorId,
  SponsorshipData,
} from "@/services/sponsorshipService";
import {
  addSponsorPayment,
  PaymentData,
} from "@/services/sponsorPaymentsService";

const paymentSchema = z.object({
  amountPaid: z.string().min(1, "Please Enter Correct Amount"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  sponsorshipId: z.array(z.number()).optional(), // Now accepting multiple sponsorship IDs
});

type PaymentFormValues = z.infer<typeof paymentSchema>;
type Student = {
  studentId: number;
  studentName: string;
  totalFees: number;
  paidAmount: number;
  remainingAmount: number;
  sponsorshipId: number; // Ensure sponsorshipId is part of student data
};

const AddPaymentForm: React.FC = () => {
  const [sponsorship, setSponsorship] = useState<SponsorshipData[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [sponsorId, setSponsorId] = useState<number | null>(null);
  const [selectedSponsorshipIds, setSelectedSponsorshipIds] = useState<
    number[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const getUniqueSponsors = (sponsorshipData: SponsorshipData[]) => {
    const seenSponsorIds = new Set();
    return sponsorshipData.filter((item) => {
      if (seenSponsorIds.has(item.sponsorId)) {
        return false;
      } else {
        seenSponsorIds.add(item.sponsorId);
        return true;
      }
    });
  };

  useEffect(() => {
    const fetchSponsorshipData = async () => {
      setLoading(true);
      try {
        const sponsorshipResponse = await fetchSponsorship();
        const uniqueSponsors = getUniqueSponsors(
          sponsorshipResponse.data as SponsorshipData[]
        );
        setSponsorship(uniqueSponsors);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorshipData();
  }, []);

  const handleSponsorSelection = async (Id: number) => {
    setSponsorId(Id);
    try {
      const studentResponse = await fetchStudentBySponsorId(Id);
      setStudents(studentResponse.data as Student[]);
    } catch (err) {
      setError(err as any);
      console.error("Failed to fetch students:", err);
    }
  };

  // Handle checkbox toggle for sponsorshipId selection
  const handleCheckboxChange = (sponsorshipId: number) => {
    setSelectedSponsorshipIds(
      (prevSelected) =>
        prevSelected.includes(sponsorshipId)
          ? prevSelected.filter((id) => id !== sponsorshipId) // Deselect
          : [...prevSelected, sponsorshipId] // Select
    );
  };

  const onSubmit: SubmitHandler<PaymentFormValues> = async (data) => {
    if (selectedSponsorshipIds.length === 0) {
      toast.error("Please select at least one sponsorship.");
      return;
    }
  
    // Convert amountPaid to a number
    const numericAmountPaid = parseFloat(data.amountPaid);
  
    if (isNaN(numericAmountPaid)) {
      toast.error("Invalid amount. Please enter a valid number.");
      return;
    }
  
    // Loop through each selected sponsorship ID and submit a payment
    for (const sponsorshipId of selectedSponsorshipIds) {
      const response = await addSponsorPayment({
        ...data,
        amountPaid: numericAmountPaid, // Convert to number
        sponsorshipId, // Submit each sponsorship ID separately
      });
  
      if (response.success) {
        toast.success(`Payment added successfully`);
      } else {
        toast.error(
          `Error adding payment: ${response.message || "Something went wrong"}`
        );
      }
    }
  
    reset();
  };
  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-end space-x-4 m-2">
          <Button>
            <span className="text-xl mr-1">
              <Icon icon="heroicons:cash" className="w-6 h-6 mr-2" />
            </span>
            Add Payment
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Payment</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 col-span-1">
              <Label>Select Sponsor</Label>
              <Select
                onValueChange={(value) =>
                  handleSponsorSelection(parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sponsor" />
                </SelectTrigger>
                <SelectContent>
                  {sponsorship.map((item) => (
                    <SelectItem
                      key={item.sponsorId}
                      value={item?.sponsorId?.toString() ?? ""}
                    >
                      {item.sponsorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="amountPaid">Enter Amount Paid</Label>
              <InputGroup merged>
                <InputGroupText>
                  <Icon icon="mdi:money" />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Enter Amount Paid"
                  id="amountPaid"
                  {...register("amountPaid")}
                />
              </InputGroup>
              {errors.amountPaid && (
                <p className="text-destructive">{errors.amountPaid.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                onValueChange={(value) => setValue("paymentMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMethod && (
                <p className="text-destructive">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
          </div>

          {/* Student Data Table with Checkbox */}
          {students.length > 0 && (
            <div className="mt-5">
              <h3>Students for Selected Sponsor</h3>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Select</th>
                    <th className="py-2 px-4 border-b">Student Name</th>
                    <th className="py-2 px-4 border-b">Total Fees</th>
                    <th className="py-2 px-4 border-b">Paid Amount</th>
                    <th className="py-2 px-4 border-b">Remaining Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.studentId}>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(student.sponsorshipId)
                          }
                          checked={selectedSponsorshipIds.includes(
                            student.sponsorshipId
                          )}
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        {student.studentName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {student.totalFees}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {student.paidAmount}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {student.remainingAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="col-span-2 my-3">
            <Button type="submit">Submit Form</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddPaymentForm;
