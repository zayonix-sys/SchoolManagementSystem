import { useState, useEffect, useCallback } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("role");
    const storedUserName = localStorage.getItem("userName");

    if (userRole === "Teacher") {
      setIsTeacher(true);
    }

    if (userRole === "Admin") {
      setIsAdmin(true);
    }

    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
      setUserName(storedUserName); 
    } else {
      setIsAuthenticated(false);
      setUserName(null);
    }

    setIsLoading(false);
  }, [logout]);

  return { isAuthenticated, isLoading, role, userName, isTeacher, isAdmin, logout };
};

export default useAuth;
