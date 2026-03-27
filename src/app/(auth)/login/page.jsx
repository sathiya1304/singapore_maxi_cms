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
  const { userData, setUserData } = useAuthContext();
  const [postError, setPostError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const token = Cookies.get("token") !== undefined;
  const ACCESS_TOKEN = Cookies.get("token");
  const [loginDetails, setLoginDetails] = useState({
    user_name: "",
    show_password: "",
  });

  const [username, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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


  const handleForgotPassword = () => {
    setIsLoading(true);
    router.push("/forgot-password");
    // const jsonStructure = {
    //   // access_token: ACCESS_TOKEN,
    //   username: username,
    // };
    // if (username.trim() === "") {
    //   setErrorMessage("Please enter a username.");
    // } else {
    //   try {
    //     axiosPost.post("send_otp", jsonStructure).then((response) => {
    //       console.log(response, "response");
    //       if (response.data.action === "success") {
    //         router.push("/forgot-password");
    //         setIsLoading(false);
    //       } else {
    //         setPostError(response.data);

    //         setIsLoading(false);
    //       }
    //     });
    //   } catch (error) {
    //     console.error("Error occurred:", error);
    //   }
    // }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const jsonStructure = {
      show_password: password,
      user_name: username,
    };
    try {
      axiosPost
        .post("user_login", jsonStructure)
        .then((response) => {
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            Cookies.set("token", response.data.access_token, {
              expires: 7, // Set the cookie expiration (7 days in this example)
            });
            Cookies.set("user_id", response.data.user_id, {
              expires: 7, // Set the cookie expiration (7 days in this example)user_login
            });
            setUserData(response.data);
            router.push("/enquiry_list");
            // setTimeout(() => {
            //   setAlertVisible(false);
            // }, 3000);
          } else {
            setPostError(response.data);
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
  <Grid container spacing={2} justifyContent="center" sx={{ overflow: "hidden" }}>
    {/* Image Section */}
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        sx={{
          width: "100%",
          maxHeight: "100vh",
          objectFit: "cover", // Ensures the image scales properly
        }}
        src="/images/BG 1.jpg"
        alt="Background"
      />
    </Grid>

    {/* Login Section */}
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: { xs: "20px", md: "0px 25px" },
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%" },
          position: "relative",
        }}
      >
        <Box my={2}>
          <LogoLite />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "600",
            fontSize: { xs: "1.8rem", sm: "2rem" },
            marginBottom: "5px",
          }}
        >
          Log in to your Account
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

        <Typography
          variant="caption"
          color="red"
          sx={{
            fontWeight: "400",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          {postError?.action === "error" ? (
            <span>{postError?.message}</span>
          ) : null}
        </Typography>
        <AuthLogin
          errorMsg={errorMessage}
          password={setpassword}
          username={setUserName}
          onSignIn={handleSignIn}
          handleForgotPassword={handleForgotPassword}
          passwordShown={passwordShown}
          toggleButton={toggleButton}
          postError={postError}
        />
      </Box>
      {isAlertVisible && (
        <AutoHideAlert
          severity={alertSeverity}
          message={alertMessage}
          autoHideDuration={3000}
          onClose={() => setAlertVisible(false)}
        />
      )}
    </Grid>
  </Grid>
</Box>

    </>
  );
};

export default Login;
