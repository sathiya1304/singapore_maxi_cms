import React from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CustomTextField from "@/app/(Dashboard)/components/forms/CustomTextField";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const AuthLogin = ({
  title,
  subtitle,
  subtext,
  onUpdate,
  passwordShown,
  toggleButton,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  postError,
}) => {
  return (
    <form>
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
            Enter Password
          </Typography>
          <TextField
            type={passwordShown ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ cursor: "pointer" }}>
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={postError?.confirm_password}
            error={postError?.confirm_password}
          />
        </Box>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={onUpdate}
        >
          Update Password
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
