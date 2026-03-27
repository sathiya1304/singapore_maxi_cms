import React from "react";
import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function BlockButton({ heading, pagecount, onAddClick }) {
  return (
    <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
      <Typography
        variant="h4"
        className="nunito_font"
        color={'primary'}
        style={{ fontSize: "16px", fontWeight: 700 }}
      >
        {heading}
      </Typography>
      <Button
      size="small"
        className="nunito_font_width"
        sx={{
          left: "10px",
          fontSize: "12px",
          marginTop: "1px",
          fontWeight: "300",
        }}
        variant="contained"
        onClick={() => onAddClick()}
      >
        <AddIcon style={{ fontSize: "18px" }} /> Add New Block
      </Button>
    </Box>
  );
}
