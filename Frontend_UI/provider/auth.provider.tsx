"use client";

import useAuth from "@/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, isAdmin, isTeacher } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const restrictedPaths = ["/en/employees", "/en/applicant","/en/campuses", "/en/classrooms","/en/sponsors", "/en/sponsorship", "/en/payments", "/en/subjects"];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (isTeacher && restrictedPaths.includes(pathname)) {
      router.push("/notAuthorize"); 
    }
  }, [isAuthenticated, isLoading, isTeacher, pathname, router]);

  return <>{children}</>;
};

export default AuthProvider;
