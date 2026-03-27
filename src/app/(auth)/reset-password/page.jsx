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
const Login = () => {
  const { userData, setUserData } = useAuthContext();
  const [postError, setPostError] = useState([]);

  const router = useRouter();

  const token = Cookies.get("token") !== undefined;

  const [loginDetails, setLoginDetails] = useState({
    user_name: "",
    show_password: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const ACCESS_TOKEN = Cookies.get("token");

  const handleUpdate = (e) => {
    e.preventDefault();
    const jsonStructure = {
      access_token: ACCESS_TOKEN,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    try {
      axiosPost
        .post("update_password", jsonStructure)
        .then((response) => {
          if (response.data.status === "success") {
            router.push("/enquiry_list");
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
              }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Reset Password
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Welcome back!
              </Typography>
              <AuthLogin
                onUpdate={handleUpdate}
                passwordShown={passwordShown}
                toggleButton={toggleButton}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                postError={postError}
              />
            </Box>
            {/* new_pass confirm_Pass */}
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
