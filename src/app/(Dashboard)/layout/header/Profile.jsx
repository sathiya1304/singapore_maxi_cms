import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Badge from '@mui/material/Badge';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";

const Profile = ({onLogout,userName,eMail,firstName,lastName}) => {
  const router = useRouter();

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleOnclick = () =>{
      router.push('/change-password')
  }
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const success = theme.palette.success.main;
  const successlight = theme.palette.success.light;
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
            padding:'0px'
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          // src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <div style={{marginLeft: "5px"}}>
        <Typography variant="h4" color='#ffffff' mr={1} className="header_font_size nunito_font" style={{fontSize:'15px'}}>{firstName} {lastName}</Typography>
        <Typography variant="h4" color='#ffffff' mr={1} className="header_font_size nunito_font" style={{marginTop: "-7px"}}>{eMail}</Typography>
        </div>
        {Boolean(anchorEl2) == false ? <KeyboardArrowDownIcon style={{color:'white'}}/>:<KeyboardArrowUpIcon style={{color:'white'}}/>}
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "260px",
            p: 2,
            pb: 2,
            pt:0
          },
        }}
      >

        <Box pt={0}>

          <List>
            {/* <ListItemButton component="a" href="#">
              <ListItemText primary="My Profile" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="My Account" />
            </ListItemButton> */}
            <ListItemButton onClick={handleOnclick}>
              <ListItemText primary="Change Password" />
            </ListItemButton>
            {/* <ListItemButton component="a" href="#">
              <ListItemText primary="My Task" />
            </ListItemButton> */}
          </List>

        </Box>
        <Divider />
        <Box mt={2}>
          <Button fullWidth variant="contained" color="primary" onClick={onLogout}>
            Logout
          </Button>
        </Box>

      </Menu>
    </Box>
  );
};

export default Profile;
