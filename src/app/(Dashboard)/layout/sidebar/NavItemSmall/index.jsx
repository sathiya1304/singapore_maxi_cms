import React from "react";
import { useState } from "react";
// mui imports
import {
  ListItem,
  List,
  useTheme,
  ListItemButton,
} from "@mui/material";

const NavItem = ({ item, level, pathDirect, onClick,index }) => {
  const Icon = item.icon;
  const theme = useTheme();
  const [isTrue,setIsTrue] = useState(false)
 

  return (
      <List component="div" disablePadding key={item.id}>
      <ListItem style={{padding:'0px'}}>
        <ListItemButton
        disabled={item.disabled}
        target={item.external ? "_blank" : ""}
        onClick={onClick}
        style={{padding: "7px 10px",display: "flex",justifyContent: "flex-start",transition: "all 0.3s",}}
        >
        <picture className="display_flex">
        <img src={item.icon} alt="" style={{objectFit: "cover", width: "16px"}}/>
        </picture>
      </ListItemButton>
      </ListItem>
      </List>
   
  );
};

export default NavItem;
