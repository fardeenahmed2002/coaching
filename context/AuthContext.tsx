"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const Context = createContext<any | null>(null);

const AuthContext = ({ children }: any) => {

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isloggedin, setIsloggedin] = useState(false);

  const router = useRouter();

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/user", { withCredentials: true });
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }

    } catch (err) {
      console.error("Error fetching user data:", (err as Error).message);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get("/api/auth/signup", { withCredentials: true });
      if (data.success) {
        setIsloggedin(true);
        await getUserData();
      } else {
        setIsloggedin(false);
        setLoading(false);
      }
    } catch (err) {
      console.log((err as Error).message);
      setIsloggedin(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      const currentPath = window.location.pathname;
      if (currentPath === "/" || currentPath === "/signin") {
        if (user.role === "student") router.push("/student");
        else if (user.role === "admin") router.push("/admin");
      }
    }

  }, [loading, user, router]);

  const value = {
    user,
    isloggedin,
    loading,
    getUserData,
    setIsloggedin,
    setUser,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default AuthContext;