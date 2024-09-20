"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import avatar from "@/public/images/avatar/avatar-3.jpg";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { User, Phone, Location, Calender, CalenderCheck, Users } from "@/components/svg";
import { fetchSponsor, SponsorData } from "@/services/sponsorService";
import { Hammer, Home, Link, Mail } from "lucide-react";

interface UserInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

// type ModifiedSponserData = {
//   label: SponsorData[keyof SponsorData],
//   value: string;
// }

const UserMeta = () => {

  const [sponsorData, setSponsorData] = useState<SponsorData | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      setLoading(true);
      try {
        const sponsorResponse = await fetchSponsor();
        if (sponsorResponse.data && sponsorResponse.data.length > 0) {
          setSponsorData(sponsorResponse.data[0] as SponsorData); 
          // let modifiedSponserData = Object.keys(sponsorResponse?.data)?.map((key) => ({
          //   label: key,
          //   value: sponsorResponse?.data[key],
          // }))
          // console.log( modifiedSponserData);
          
          // setSponsorData(modifiedSponserData)
        }
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const userInfo: UserInfoItem[] = [
    {
      icon: User,
      label: "Full Name",
      value: sponsorData?.sponsorName || "N/A",
    },
    {
      icon: Mail,
      label: "Email",
      value: sponsorData?.email || "N/A",
    },
    {
      icon: Users,
      label: "Gender",
      value: sponsorData?.gender || "N/A",
    },
    {
      icon: Phone,
      label: "Mobile",
      value: sponsorData?.phoneNumber || "N/A",
    },
    {
      icon: Hammer,
      label: "Occupation",
      value: sponsorData?.occupation || "N/A",
    },
    {
      icon: Home,
      label: "Address",
      value: sponsorData?.address || "N/A",
    },
    {
      icon: Location,
      label: "City",
      value: sponsorData?.city || "N/A",
    },
    {
      icon: Location,
      label: "State",
      value: sponsorData?.state || "N/A",
    },
    {
      icon: Location,
      label: "Country",
      value: sponsorData?.country || "N/A",
    },
    {
      icon: Calender,
      label: "Postal Code",
      value: sponsorData?.postalCode?.toString() || "N/A",
    },
  ];

  return (
   <>
   <Button asChild className=" bottom-0  absolute  rounded px-5 mb-12 hidden lg:flex" size="sm">
              <Link href="/user-profile/settings">
                <Icon className="w-4 h-4 ltr:mr-1 rtl:ml-1" icon="heroicons:pencil-square" />
                Edit
              </Link>
            </Button>
   
   <Card>
    
      <CardContent className="py-3 mx-8 flex flex-col items-center">

      <CardHeader className="border-none mb-0 px-6">
        <CardTitle className="text-xl font-semibold text-default-800">Personal Information</CardTitle>
        
      </CardHeader>
        <div className="w-[124px] h-[124px] relative rounded-full">
          <Image src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" priority={true} />
          <Button asChild size="icon" className="h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0">
            <Label htmlFor="avatar">
              <Icon className="w-5 h-5 text-primary-foreground" icon="heroicons:pencil-square" />
            </Label>
          </Button>
          <Input type="file" className="hidden" id="avatar" />
        </div>
        <div className="mt-4 text-xl font-semibold text-default-900">{sponsorData?.sponsorName || "N/A"}</div>
      </CardContent>


      <CardContent className="p-10 flex flex-col items-center">
        <ul className="mt-6 grid grid-cols-2 gap-4">
          {userInfo.map((item, index) => (
            <li key={`user-info-${index}`} className="flex items-center">
              <div className="flex-none flex items-center gap-1.5">
                <span>{<item.icon className="w-5 h-5 text-primary" />}</span>
                <span className="text-base font-medium text-default-800">{item.label}:</span>
              </div>
              <div className="flex-1 text-base text-default-700">{item.value}</div>
            </li>
          ))}
        </ul>
     </CardContent>
    </Card>
</>  
);
};

export default UserMeta;
