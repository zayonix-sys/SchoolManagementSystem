"use client"

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs'
import React, { useEffect, useState } from 'react'
import SponsorshipListTable from './sponsorship-list-table'
import AddSponsorshipForm from './add-sponsordhip'
import { fetchSponsorship, SponsorshipData } from '@/services/sponsorshipService'

const Page = () => {
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
      <AddSponsorshipForm sponsorship={sponsorship}/>
        <SponsorshipListTable sponsorship={sponsorship} />
        
        </div>
    

  )
}

export default Page
