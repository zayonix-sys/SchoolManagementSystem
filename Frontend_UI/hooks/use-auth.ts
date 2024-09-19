import { useState, useEffect, useCallback, useRef } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const inactiveTimerRef = useRef<number | null>(null);
  const sessionTimeout = 15 * 60 * 1000; // 15 minutes

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiry");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
  }, []);

  const resetTimer = useCallback(() => {
    const expiryTime = new Date(new Date().getTime() + sessionTimeout).toISOString();
    localStorage.setItem("authTokenExpiry", expiryTime);

    // Clear the previous timer
    if (inactiveTimerRef.current) clearTimeout(inactiveTimerRef.current);

    // Set a new timer
    inactiveTimerRef.current = window.setTimeout(logout, sessionTimeout);
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("authTokenExpiry");
    const userRole = localStorage.getItem("role");

    if(userRole === "Teacher"){
      setIsTeacher(true)
    }

    if(userRole === "Admin"){
      setIsAdmin(true)
    }

    if (token && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);

      if (expiryDate > now) {
        setIsAuthenticated(true);
        setRole(userRole); 
        resetTimer(); // Start inactivity timer
      } else {
        logout(); // Token expired
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);

    // Reset timer on user activity
    const activityEvents = ["mousemove", "keydown", "click"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (inactiveTimerRef.current) clearTimeout(inactiveTimerRef.current);
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logout, resetTimer]);

  return { isAuthenticated, isLoading, role, isTeacher, isAdmin};
};

export default useAuth;
