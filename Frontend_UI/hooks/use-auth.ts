import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = typeof window !== "undefined" ? useRouter() : null; // Ensure router only runs on the client

  // Load token from local storage when app starts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    if (router) {
      router.push("/dashboard"); // Redirect to dashboard on login
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    if (router) {
      router.push("/login"); // Redirect to login on logout
    }
  };

  const isAuthenticated = token !== null; // Add this line

  return {
    token,
    login,
    logout,
    isAuthenticated, // Add this line
  };
};

export default useAuth;
