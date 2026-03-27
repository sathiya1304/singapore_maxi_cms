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
  verifyOnOTP,
  setVerifyOTP,
  verifyOTP,
  postError,
  onUserChange,
  errorMsg,
  sendOnOtp,
  show,isButtonDisabled
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
        {!show && (
          <>
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
                onChange={onUserChange}
                helperText={postError?.user_name}
                error={postError?.user_name}
              />
             
            </Box>
            {errorMsg && (
              <Typography variant="body2" color="error">
                {errorMsg}
              </Typography>
            )}
          </>
        )}
        {show && (
          <Box sx={{ my: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              OTP
            </Typography>
            <MuiOtpInput value={verifyOTP} onChange={setVerifyOTP} length={6} />
            <Typography variant="caption" color={"red"}>
              {postError?.action === "error" ? (
                <span>{postError?.message?.otp_number}</span>
              ) : null}
            </Typography>
          </Box>
        )}
      </Stack>
      <Stack my={1} gap={2}>
        {!show && (
          <>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={sendOnOtp}
              disabled={isButtonDisabled}
            >
              Send OTP
            </Button>
          </>
        )}
        {show && (
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            onClick={verifyOnOTP}
          >
            Verify OTP
          </Button>
        )}
      </Stack>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
