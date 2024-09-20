"use client";

import useAuth from "@/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, isAdmin, isTeacher } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const restrictedPaths = ["/en/employees", "/en/applicant"];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (isTeacher && restrictedPaths.includes(pathname)) {
      router.push("/notAuthorize"); // Redirect to a "not authorized" page or any other page
    }
  }, [isAuthenticated, isLoading, isTeacher, pathname, router]);

  return <>{children}</>;
};

export default AuthProvider;
