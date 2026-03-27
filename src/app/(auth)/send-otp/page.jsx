"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box, Card, Typography } from "@mui/material";
import AuthLogin from "./AuthLogin";
import { axiosPost } from "@/lib/api";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import Cookies from "js-cookie";
import { useAuthContext } from "@/app/DataProvider";
import LogoLite from "@/app/(Dashboard)/layout/shared/logo/LogoLite";
const Login = () => {
  const [postError, setPostError] = useState();
  const { userData, setUserData } = useAuthContext();
  const router = useRouter();


  const token = Cookies.get("token") !== undefined;
  const ACCESS_TOKEN = Cookies.get("token");

  const [verifyOTP, setVerifyOTP] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isForgot, setisForgot] = useState(false);

  const handleVerifyOTP = () => {
    // e.preventDefault();
    const jsonStructure = {
      access_token: ACCESS_TOKEN,
      otp_number: verifyOTP,
    };
    try {
      axiosPost.post("verify_otp", jsonStructure).then((response) => {
        if (response.data.action === "success") {
          // router.push("/forgot-password");
        } else {
          setPostError(response.data);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const toggleButton = () => {
    setPasswordShown(!passwordShown);
  };

  const backgroundImageUrl = "url(/images/bg.png)";

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ overflow: "hidden" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            xl={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component={"img"}
              textAlign="center"
              sx={{
                width: "100%",
                position: "relative",
              }}
              src="/images/BG 1.jpg"
            ></Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            xl={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100vh",
              padding: "0px 25px !important",
              background: "white",
            }}
          >
            <Box
              sx={{
                width: "50%",
                position: "relative",
              }}
            >
              {/* <img src="/images/logos/ClayDark.svg" alt="logo" style={{height:"45px"}} priority /> */}
              <Box my={2}>
                <LogoLite />
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Verify your Account
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  marginBottom: "25px",
                }}
              >
                Enter the OTP send to the user email
              </Typography>
              <AuthLogin
                verifyOnOTP={handleVerifyOTP}
                verifyOTP={verifyOTP}
                setVerifyOTP={setVerifyOTP}
                postError={postError}
              />
            </Box>
            {isAlertVisible && (
              <AutoHideAlert
                severity={alertSeverity}
                message={alertMessage}
                autoHideDuration={3000}
                onClose={() => {
                  setAlertVisible(false);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
