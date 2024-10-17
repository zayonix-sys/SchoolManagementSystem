"use client"

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import React, { useEffect, useState } from 'react'

import { fetchSponsorPayment, PaymentData } from '@/services/sponsorPaymentsService';
import AddPaymentForm from './add-sponsor-payments';
import PaymentListTable from './sponsor-payments-table';


const page = () => {
  const [payment, setPayment] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [paymentData] = await Promise.all([
          fetchSponsorPayment(),

        ]);
        setPayment(paymentData.data as PaymentData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  
  }, []);

  return (
    <>
    <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Sponsors Payments</BreadcrumbItem>
      </Breadcrumbs>
      <AddPaymentForm/>
        <PaymentListTable  payment={payment} />
    </>


  )
}

export default page
