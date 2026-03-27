import React from "react";
import { IconButton, Box } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
export default function ViewButton({ HandleChangeView, editList }) {
  return (
    <Box>
      <IconButton
        size="small"
        onClick={() => HandleChangeView()}
        sx={{
          fontSize: "12px",
          fontWeight: "300",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          padding: "7px",
        }}
      >
       
          <VisibilityOutlinedIcon  style={{ fontSize: "16px", color: "black" }} />
       
      </IconButton>
    </Box>
  );
}
