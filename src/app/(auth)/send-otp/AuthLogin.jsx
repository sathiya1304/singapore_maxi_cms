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
            ) :null}
          </Typography>
        </Box>
      </Stack>
      <Box my={1}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={verifyOnOTP}
        >
          Verify OTP
        </Button>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
