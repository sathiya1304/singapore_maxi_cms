import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Logo from "../shared/logo/LogoLite";
import Profile from './Profile';
import MenuIcon from '@mui/icons-material/Menu';
import BadgerComponent from '../header/Badger'
import { useTheme } from "@mui/material/styles";

const Header = ({ toggleMobileSidebar,onLogout,userName,company,eMail,firstName,lastName }) => {

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px !important;",
    background: theme.palette.primary.main,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up('lg')]: {
      minHeight: '45px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const theme = useTheme();

  // const backgroundImageUrl = "url(/images/dark.jpg)";

  return (
    <AppBarStyled position="sticky" color="default" >
      <ToolbarStyled style={{paddingLeft:'2px',paddingRight:'10px',minHeight:'45px'}}>
      <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            color:'#fff',
            display: {
              xs: "flex",
            },
          }}
        >
          {/* <IconMenu2 width="22" height="22" /> */}
          <MenuIcon width="22" />
        </IconButton>
        <Box>
          <Logo company={company} />
        </Box>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <BadgerComponent/>
          <Profile onLogout={onLogout} userName={userName} eMail={eMail} firstName={firstName} lastName={lastName}/>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
