import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';import React from "react";
import { IconButton, Box } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
export default function EditButton({ HandleChangeDelete, editList }) {
  return (
    <Box>
      <IconButton
        size="small"
        onClick={() => HandleChangeDelete()}
        sx={{
          fontSize: "12px",
          fontWeight: "300",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          padding: "7px",
        }}
      >
       
          <DeleteOutlineOutlinedIcon style={{ fontSize: "16px", color: "black" }} />
       
      </IconButton>
    </Box>
  );
}
