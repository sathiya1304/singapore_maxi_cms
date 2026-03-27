"use client";
import { styled, Container, Box, useTheme, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "@/app/(Dashboard)/layout/header/Header";
import Sidebar from "@/app/(Dashboard)/layout/sidebar/Sidebar";
import Cookies from "js-cookie";
import { axiosGet } from "@/lib/api";
import { useRouter } from "next/navigation";
import { allowedPathsByUserType } from "@/lib/config";
import { usePathname } from "next/navigation";
import { PrivilegesProvider } from "../PrivilegesProvider";
import Loading from "./loading";

const MainWrapper = styled("div")(() => ({
  // display: "flex",
  // minHeight: "100vh",
  // width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  // paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(0);
  const [userCmp, setUserCmp] = useState(0);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEmail] = useState("");
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    axiosGet
      .get(`valid_token?user_token=${token}`)
      .then((response) => {
        if (response.data.action === "success") {
          setUserData(response.data.user_data);
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

  const logout = async () => {
    axiosGet
      .get(`user_logout?access_token=${token}`)
      .then((response) => {
        if (response.data.action === "success") {
          router.push("/login");
          Cookies.remove("token");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const [drawerWidth, setdrawerWidth] = useState(40);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMobileSidebarOpen(!isMobileSidebarOpen);
    if (isMobileSidebarOpen == false) {
      setdrawerWidth(220);
    } else {
      setdrawerWidth(40);
    }
  };

  const ManualCloseDrawer = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
    if (isMobileSidebarOpen == false) {
      setdrawerWidth(220);
    } else {
      setdrawerWidth(40);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathname]);

  if (!userData) {
    return <Loading />;
  }
  
  return (
    <PrivilegesProvider>
      <MainWrapper className="mainwrapper">
        <Header
          onLogout={logout}
          toggleMobileSidebar={() => ManualCloseDrawer()}
          userName={userName}
          company={userCmp}
          eMail={eMail}
          firstName={firstName}
          lastName={lastName}
        />
        <PageWrapper className="page-wrapper">
          <Sidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            userType={userType}
            toggleDrawer={toggleDrawer}
            drawerWidth={drawerWidth}
            onSidebarClose={ManualCloseDrawer}
          />
          <Container
            component="main"
            sx={{
              height: "calc(100vh - 45px) !important",
              maxWidth: "100% !important",
              padding: "7px 0px 0px !important",
              paddingLeft: `${drawerWidth}px !important`,
              boxSizing: "border-box",
              transition: "all 0.3s",
            }}
          >
            <Box>{children}</Box>
          </Container>
        </PageWrapper>
      </MainWrapper>
    </PrivilegesProvider>
  );
}
