// "use client";

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   return <>{children}</>;
// };

// export default AuthProvider;

"use client";
import React, { createContext, useContext } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/use-auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();

  // Redirect to login page if not authenticated
  if (!auth.isAuthenticated && router.pathname !== "/auth/login") {
    router.push("/auth/login");
    return null;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
