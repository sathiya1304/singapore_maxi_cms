"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box, Card, Typography } from "@mui/material";
import AuthLogin from "./AuthLogin";
import AuthReset from "./AuthReset";
import { axiosPost } from "@/lib/api";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import Cookies from "js-cookie";
import { useAuthContext } from "@/app/DataProvider";
import LogoLite from "@/app/(Dashboard)/layout/shared/logo/LogoLite";
const Login = () => {
  const [postError, setPostError] = useState();
  const { userData, setUserData } = useAuthContext();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = Cookies.get("token") !== undefined;
  const ACCESS_TOKEN = Cookies.get("token");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isForgot, setisForgot] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUserName] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSendOtp = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    const jsonStructure = {
      username: username,
    };
    if (username.trim() === "") {
      setErrorMessage("Please enter a username.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } else {
      try {
        axiosPost.post("send_otp", jsonStructure).then((response) => {
          if (response.data.action === "success") {
            // router.push('/forgot-password');
            setShowOtp(true);
            setShowReset(false);
          } else {
            setPostError(response.data.message);
            setShowReset(false);
            setShowOtp(false);
          }
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  };

  const onUserChange = (event) => {
    setUserName(event.target.value);
    setErrorMessage("");
  };

  const handleVerifyOTP = () => {
    // e.preventDefault();
    const jsonStructure = {
      // access_token: ACCESS_TOKEN,
      otp_number: verifyOTP,
      username: username,
    };
    try {
      axiosPost.post("verify_otp", jsonStructure).then((response) => {
        if (response.data.action === "success") {
          // router.push("/reset-password");
          setShowReset(true);
        } else {
          setPostError(response.data);
          setShowReset(false);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const jsonStructure = {
      access_token: ACCESS_TOKEN,
      username: username,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    try {
      axiosPost
        .post("update_password", jsonStructure)
        .then((response) => {
          if (response.data.action === "success") {
            router.push("/login");
          } else {
            setPostError(response.data.message);
            setAlertMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.error("POST Error:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


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
              src="/images/BG 2.jpg"

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
                {!showReset
                  ? "Enter the OTP send to the user email"
                  : "Reset your Password"}
              </Typography>
              {!showReset ? (
                <>
                  <AuthLogin
                    verifyOnOTP={handleVerifyOTP}
                    verifyOTP={verifyOTP}
                    sendOnOtp={handleSendOtp}
                    setVerifyOTP={setVerifyOTP}
                    postError={postError}
                    onUserChange={onUserChange}
                    errorMsg={errorMessage}
                    show={showOtp}
                    isButtonDisabled={isButtonDisabled}
                  />
                </>
              ) : (
                <>
                  <AuthReset
                    onUpdate={handleUpdate}
                    passwordShown={passwordShown}
                    toggleButton={toggleButton}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    postError={postError}
                  />
                </>
              )}
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
