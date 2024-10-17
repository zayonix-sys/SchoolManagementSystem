"use client"; // Make sure this is at the very top

import React, { useEffect } from "react";
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
import {
  updateSponsorPayment,
  PaymentData,
} from "@/services/sponsorPaymentsService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Zod schema for validation
const paymentSchema = z.object({
  paymentId: z.number().optional(),
  amountPaid: z.number().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  sponsorshipId: z.number().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function EditPaymentForm({ payment }: { payment: PaymentData }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amountPaid: payment?.amountPaid || 0, 
      paymentMethod: payment?.paymentMethod || "",
    },
  });

  useEffect(() => {
    if (payment) {
      setValue("amountPaid", payment.amountPaid);
      setValue("paymentMethod", payment.paymentMethod || "");
    }
  }, [payment, setValue]);

  const onSubmit: SubmitHandler<PaymentFormValues> = async (data) => {
    if (!payment) return;

    try {
      const updatedPayment = {
        ...payment,
        paymentId: payment?.paymentId,
        amountPaid: data.amountPaid, 
        paymentMethod: data.paymentMethod,
      };

      const response = await updateSponsorPayment(updatedPayment);

      if (response.success) {
        toast.success("Payment updated successfully");
        reset();
      } else {
        toast.error(`Failed to update payment: ${response.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Request failed");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="h-7 w-7">
          <Icon icon="heroicons:pencil" className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Edit Sponsor Payment</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Input
                    type="text"
                    value={payment?.sponsorName || ""}
                    readOnly
                    className="bg-gray-200"
                    placeholder="Sponsor Name"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Input
                    id="amountPaid"
                    type="text"
                    {...register("amountPaid")}
                    className={`${errors.amountPaid ? "border-red-500" : ""}`}
                    placeholder="Amount Paid"
                  />
                  {errors.amountPaid && <p className="text-destructive">{errors.amountPaid.message}</p>}
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Select
                    onValueChange={(value) => setValue("paymentMethod", value)}
                    defaultValue={payment?.paymentMethod || ""}
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
                  {errors.paymentMethod && <p className="text-destructive">{errors.paymentMethod.message}</p>}
                </div>
                <div className="col-span-2">
                  <Button type="submit">Update Payment</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
