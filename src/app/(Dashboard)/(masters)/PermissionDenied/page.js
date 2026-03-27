"use client"
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
function page() {
    const router = useRouter()
  return (
      <Box height={"80vh"} display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
        <Typography>Access Denied. Please contact the Admin</Typography>
        <Button onClick={() => router.push('/')} size="small" variant="contained">Go to Home Page</Button>
      </Box>
  );
}

export default page;
