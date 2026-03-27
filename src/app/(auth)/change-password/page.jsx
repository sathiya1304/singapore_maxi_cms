"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box, Card, Typography } from "@mui/material";
import AuthLogin from "./AuthLogin";
import { axiosPost } from "@/lib/api";
// import AutoHideAlert from "@/app/(enquiry_list)/components/container/AutoHideAlert";

import Cookies from "js-cookie";
import { useAuthContext } from "@/app/DataProvider";
// import LogoLite from "@/app/(enquiry_list)/layout/shared/logo/LogoLite";
const Login = () => {
  const { userData, setUserData } = useAuthContext();
  const [postError, setPostError] = useState([]);

  const router = useRouter();

  const token = Cookies.get("token") !== undefined;
  const ACCESS_TOKEN = Cookies.get("token");
  const [loginDetails, setLoginDetails] = useState({
    user_name: "",
    show_password: "",
  });

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isForgot, setisForgot] = useState(false);

  const handleLoginDetailsChange = (fieldName, value) => {
    setLoginDetails((prevLoginDetails) => ({
      ...prevLoginDetails,
      [fieldName]: value,
    }));
  };

  const handlePassChange = () => {
    const jsonData = {
      access_token: ACCESS_TOKEN,
      current_password: password,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    try {
      axiosPost
        .post("password_change", jsonData)
        .then((response) => {
          if (response.data.action === "success") {
            router.push("/enquiry_list");
          } else {
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          console.error("POST Error:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const toggleButton1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const toggleButton2 = () => {
    setPasswordShown2(!passwordShown2);
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
                {/* <LogoLite /> */}
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Change Password
              </Typography>
              {/* <Typography
                variant="h6"
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Welcome back!
              </Typography> */}
             
              <AuthLogin
                password={password}
                setPassword={setPassword}
                newPass={newPassword}
                setNewPass={setNewPassword}
                confirmPass={confirmPassword}
                setConfirmPass={setConfirmPassword}
                onPassChange={handlePassChange}
                passwordShown1={passwordShown1}
                passwordShown2={passwordShown2}
                toggleButton1={toggleButton1}
                toggleButton2={toggleButton2}
                postError={postError}
              />
            </Box>
            {/* {isAlertVisible && (
              <AutoHideAlert
                severity={alertSeverity}
                message={alertMessage}
                autoHideDuration={3000}
                onClose={() => {
                  setAlertVisible(false);
                }}
              />
            )} */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
