import React from "react";
import { useState } from "react";
// mui imports
import {
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
  Collapse
} from "@mui/material";
import Link from "next/link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const NavItem = ({ item, level, pathDirect, onClick,index }) => {
  const theme = useTheme();
  const [isTrue,setIsTrue] = useState(false)
  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      padding: "2px 1px",
      marginBottom:'5px',
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.primary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: "#F2F8FF",
      },
      "&.Mui-selected": {
        backgroundColor: "#F2F8FF",
        borderRight:'4px solid #e51f23',
        color:'#e51f23',
        "&:hover": {
          backgroundColor: "#F2F8FF",
          borderRight:'4px solid #e51f23',
          color:'#e51f23',
        },
      },
    },
  }));

  const handleOnclick = () => {
      setIsTrue(!isTrue)
  }

  const [openSubMenu, setOpenSubMenu] = useState(false);

  const [openSubMenuIndex, setopenSubMenuIndex] = useState();

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(!openSubMenu);
    if(!openSubMenu == true){
      setopenSubMenuIndex(index);
    }else{
      setopenSubMenuIndex();
    }
  };
  return (
      <List component="div" disablePadding key={item.id}>
      <ListItem style={{padding: "0px",paddingBottom: "2px"}}>
        {item.submenu.length == 0 ? 
         <ListItemButton
         component={Link}
         href={item.href}
         disabled={item.disabled}
         selected={pathDirect === item.href || item.related_path?.includes(pathDirect)}
         target={item.external ? "_blank" : ""}
         onClick={item.submenu.length == 0 ? handleOnclick:() => handleSubMenuToggle(index)}
         style={{padding: "5px 16px"}}
       >
        <picture className="display_flex">
        <img src={item.icon} alt="" style={{objectFit: "cover", width: "16px"}}/>
        </picture>
         <ListItemText style={{marginLeft:'10px', marginBottom:'5px'}}>
           <span className="menu_font_style nunito_font_width" style={{fontWeight:400, fontSize:"15px", color: '#185AA6'}}>{item.title}</span>
         </ListItemText>
       </ListItemButton>:
        <ListItemButton
        disabled={item.disabled}
        target={item.external ? "_blank" : ""}
        onClick={() => handleSubMenuToggle(index)}
        style={{padding: "5px 16px"}}
      >
        <picture className="display_flex">
        <img src={item.icon} alt="" style={{objectFit: "cover", width: "16px"}}/>
        </picture>
        <ListItemText style={{marginLeft:'10px', marginBottom:'5px'}}>
          <span className="menu_font_style nunito_font_width" style={{fontWeight:400, fontSize:"15px", color: '#185AA6'}}>{item.title}</span>
        </ListItemText>
        {openSubMenu == false && index != openSubMenuIndex ? <KeyboardArrowDownIcon style={{color:'#185AA6',fontSize:'20px'}}/>:<KeyboardArrowUpIcon style={{color:'#185AA6',fontSize:'20px'}}/>}
      </ListItemButton>}
       
      </ListItem>
      {item.submenu && (
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.submenu.map((subItem) => (
              <ListItem key={subItem.id} style={{padding: "0px",paddingBottom: "2px"}}>
                <ListItemButton
                  component={Link}
                  href={subItem.href}
                  disabled={subItem.disabled}
                  selected={pathDirect === subItem.href}
                  target={subItem.external ? "_blank" : ""}
                  onClick={handleOnclick}
                  style={{padding: "3px 15px"}}
                >
                  <ListItemText>
                  <span className="menu_font_style nunito_font_width display_full_width" style={{fontWeight:400, fontSize:"15px", color: '#185AA6', marginLeft: '27px', textTransform: "capitalize"}}>{subItem.title}</span>
                </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
      </List>
   
  );
};

export default NavItem;
