"use client";

import LogInForm from "@/components/auth/login-form";
import { useAuth } from "@/hooks/use-auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();

  return <>{auth ? children : <LogInForm />}</>;
  // return <>{children}</>;
};

export default AuthProvider;
