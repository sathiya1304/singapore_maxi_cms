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
  onPassChange,
  passwordShown1,
  passwordShown2,
  toggleButton1,
  toggleButton2,
  password,
  setPassword,
  newPass,
  setNewPass,
  confirmPass,
  setConfirmPass,
  username,
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
        <Box mt="25px">
        <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Enter Old Password
          </Typography>
          <TextField
            type={passwordShown1 ? "text" : "password"}
            variant="outlined"
            fullWidth
            // onChange={(e) =>
            //   onLoginDetailsChange("show_password", e.target.value)
            // }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ cursor: "pointer" }}>
                  {passwordShown1 ? (
                    <LockOpenIcon
                      onClick={toggleButton1}
                      style={{ color: "#185aa6" }}
                    />
                  ) : (
                    <LockIcon
                      onClick={toggleButton1}
                      style={{ color: "#185aa6" }}
                    />
                  )}
                </InputAdornment>
              ),
              style: {
                paddingLeft: "10px",
                backgroundColor: "white",
                marginBottom: "15px",
              },
            }}
            helperText={postError?.current_password}
            error={postError?.current_password}
          />
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Enter New Password
          </Typography>
          <TextField
            type={passwordShown2 ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={newPass}

            onChange={(e) => setNewPass(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ cursor: "pointer" }}>
                  {passwordShown2 ? (
                    <LockOpenIcon
                      onClick={toggleButton2}
                      style={{ color: "#185aa6" }}
                    />
                  ) : (
                    <LockIcon
                      onClick={toggleButton2}
                      style={{ color: "#185aa6" }}
                    />
                  )}
                </InputAdornment>
              ),
              style: { paddingLeft: "10px", backgroundColor: "white" },
            }}
            helperText={postError?.new_password}
            error={postError?.new_password}
          />
        </Box>
        <Box my="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Confirm Password
          </Typography>
          <TextField
            type={"password"}
            variant="outlined"
            fullWidth
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            helperText={postError?.confirm_password}
            error={postError?.confirm_password}
          />
        </Box>
      </Stack>
      <Box my={1}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={onPassChange}
        >
          Change Password
        </Button>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
