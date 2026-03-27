import React, { createContext, useState, useEffect } from "react";
import { axiosGet } from "@/lib/api";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Create a context for the user privileges
export const PrivilegesContext = createContext();

export const PrivilegesProvider = ({ children }) => {
  const [privileges, setPrivileges] = useState([]);
  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const token = Cookies.get("token");

  const pathname = usePathname();
  useEffect(() => {
    // Function to fetch user privileges
    const fetchPrivileges = async () => {
      axiosGet
        .get(`valid_token?user_token=${token}`)
        .then((response) => {
          if (response.data.action === "success") {
            setUserData(response.data.user_data);
            setPrivileges(response.data.user_privileges);
          } else {
            Cookies.remove("token");
            Cookies.remove("user_id");
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    // Fetch privileges on component mount

    fetchPrivileges();
  }, [pathname]);

  return (
    <PrivilegesContext.Provider value={privileges}>
      {children}
    </PrivilegesContext.Provider>
  );
};
