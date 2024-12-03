"use client"

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import React, { useEffect, useState } from 'react'
// import AddPaymentForm from './add-sponsor-payments';
import PaymentListTable from './sponsor-payments-table';
import { PaymentData, useFetchSponsorPaymentsQuery } from '@/services/apis/sponsorPaymentService';


const page = () => {

  const { data, isLoading, error, refetch } = useFetchSponsorPaymentsQuery();
  const payment = data?.data as PaymentData[];
  
  const handleRefetch = () => {
    refetch();
  }

  return (
    <>
    <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Sponsors Payments</BreadcrumbItem>
      </Breadcrumbs>
      {/* <AddPaymentForm refetch={handleRefetch}/> */}
        <PaymentListTable  payment={payment} refetch={handleRefetch}/>
    </>


  )
}

export default page
