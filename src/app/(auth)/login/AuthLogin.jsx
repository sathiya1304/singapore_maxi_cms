import React from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CustomTextField from "@/app/(Dashboard)/components/forms/CustomTextField";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { MuiOtpInput } from "mui-one-time-password-input";
const AuthLogin = ({
  title,
  subtitle,
  subtext,
  onSignIn,
  handleForgotPassword,
  passwordShown,
  toggleButton,
  password,
  username,
}) => {
  return (
    <Box>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            onChange={(e) => username(e.target.value)}
            // helperText={postError?.confirm_password}
            // error={postError?.confirm_password}
          />
        </Box>
        <Box mt={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <TextField
            type={passwordShown ? "text" : "password"}
            variant="outlined"
            fullWidth
            // onChange={(e) =>
            //   onLoginDetailsChange("show_password", e.target.value)
            // }
            onChange={(e) => password(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ cursor: "pointer" }}>
                  {passwordShown ? (
                    <LockOpenIcon
                      onClick={toggleButton}
                      style={{ color: "#185aa6" }}
                    />
                  ) : (
                    <LockIcon
                      onClick={toggleButton}
                      style={{ color: "#185aa6" }}
                    />
                  )}
                </InputAdornment>
              ),
              style: { paddingLeft: "10px", backgroundColor: "white" },
            }}
            // helperText={postError?.confirm_password}
            // error={postError?.confirm_password}
          />
        </Box>
        {/* <Stack
          justifyContent="end"
          direction="row"
          alignItems="center"
          mt={0.5}
        >
          <Typography
            fontWeight="500"
            sx={{
              textAlign: "right",
              width: "120px",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "none",
              color: "primary.main",
            }}
            onClick={handleForgotPassword}
          >
            Forgot Password ?
          </Typography>
        </Stack> */}
        {/* <Box sx={{ my: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            OTP
          </Typography>
          <MuiOtpInput value="123456" length={6} />
        </Box> */}
      </Stack>
      <Box my={1}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={onSignIn}
        >
          Login
        </Button>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
