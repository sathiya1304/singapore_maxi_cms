import React from "react";
import { IconButton, Box } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
export default function ViewButton({ HandleChangeList, editList }) {
  return (
    <Box>
      <IconButton
        size="small"
        onClick={() => HandleChangeList()}
        sx={{
          fontSize: "12px",
          fontWeight: "300",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          padding: "7px",
        }}
      >
       
          <FormatListBulletedIcon  style={{ fontSize: "16px", color: "black" }} />
       
      </IconButton>
    </Box>
  );
}
