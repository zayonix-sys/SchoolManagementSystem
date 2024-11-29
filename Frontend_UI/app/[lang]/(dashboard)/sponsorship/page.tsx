"use client"

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs'
import React, { useEffect, useState } from 'react'
import SponsorshipListTable from './sponsorship-list-table'
import AddSponsorshipForm from './add-sponsordhip'
import { fetchSponsorship, SponsorshipData } from '@/services/sponsorshipService'
import { SponsorData, useFetchSponsorsQuery } from '@/services/apis/sponsorService'

const Page = () => {

  const { data: sponsorData, isLoading:sponsorLoading, error:sponsorError, refetch } = useFetchSponsorsQuery();
  const sponsor = sponsorData?.data as SponsorData[];
  
  const handleRefetch = () => {
    refetch();
  }



  const [sponsorship, setSponsorship] = useState<SponsorshipData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sponsorshipData] = await Promise.all([
          fetchSponsorship(),

        ]);
        setSponsorship(sponsorshipData.data as SponsorshipData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  
  }, []);


  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administration</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Sponsorship</BreadcrumbItem>
      </Breadcrumbs>
      <AddSponsorshipForm sponsorship={sponsorship} refetch={handleRefetch} sponsor={sponsor}/>
        <SponsorshipListTable sponsorship={sponsorship} refetch={handleRefetch} sponsor={sponsor}/>
        
        </div>
    

  )
}

export default Page
