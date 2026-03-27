import {
  Grid,
  Box,
  Typography,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Avatar,
  Paper,
  IconButton,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Divider,
  Menu,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useUserData from "@/lib/useUserData";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { axiosGet } from "@/lib/api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import CakeIcon from '@mui/icons-material/Cake';
import GradeIcon from '@mui/icons-material/Grade';

const NavItem = ({onSidebarClose,onLogout}) => {
  const ACCESS_TOKEN = Cookies.get('token');
  const [data,setData] = useState();

  const fetchData = async () => {
    axiosGet.get(`valid_token?user_token=${ACCESS_TOKEN}`).then((response) => {
        if (response.data.status === 200) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [ACCESS_TOKEN]);

  return (
    <div>
      <div className="displey_space_between global_padding">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => onSidebarClose()}>
            <KeyboardBackspaceIcon style={{ color: "black",marginTop: "-2px",fontSize: "20px"}} />
          </IconButton>
          <Typography
            variant="h4"
            className="nunito_font"
            style={{ fontSize: "14px", fontWeight: 700, color: "#185AA6" }}
          >
            My Profile
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => onLogout()}>
            <LogoutIcon style={{ color: "#185AA6",marginTop: "-2px",fontSize: "20px"}} />
          </IconButton>
        </div>
      </div>

      {data?.user_type == 'employee_user' ? 
      <div>
      <Box
     sx={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       marginTop: "15px"
     }}
   >
     <Box sx={{ position: "relative" }}>
       {data?.user_image == undefined || data?.user_image == '' || data?.user_image == NaN ? (
         <Avatar
           src="/images/users/7.jpg"
           sx={{ width: 100, height: 100 }}
         ></Avatar>
       ) : (
         <Avatar
           src={data?.user_image}
           sx={{ width: 100, height: 100 }}
         ></Avatar>
       )}
     </Box>
   </Box>
   <Box>
    <div style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
     }}>
    <Typography
     variant="p"
     fontSize={"16px"}
     fontWeight={"bold"}
     style={{color:'black',marginTop:'8px'}}
   >
     {data?.first_name} {data?.last_name}
   </Typography>
    </div>
  <div style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
     }}>
  <Typography
     variant="p"
     fontSize={"10px"}
     style={{color:'#00000057'}}
   >
     Joined {data?.employee_id?.joined_f_date}
   </Typography>
  </div>
   </Box>
 
   <Box sx={{marginTop:'15px'}}>
     <div style={{borderTop: "2px solid #c9c9c926",padding:'15px'}}>
     <div style={{
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "center",
       marginBottom:'5px'
     }}>
    <Typography
     variant="p"
     fontSize={"12px"}
     fontWeight={"bold"}
     style={{color:'black',display: "flex",alignItems: "center"}}
   >
     <EmailIcon style={{ color: "black",fontSize: "16px",marginTop:'0px'}} />
     <span style={{marginLeft:'5px'}}>
     {data?.email}
     </span>
   </Typography>
    </div>
    <div style={{
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "center",
       marginBottom:'5px'
     }}>
    <Typography
     variant="p"
     fontSize={"12px"}
     fontWeight={"bold"}
     style={{color:'black',display: "flex",alignItems: "center"}}
   >
     <PhoneInTalkIcon style={{ color: "black",fontSize: "16px",marginTop:'-1px'}} />
     <span style={{marginLeft:'5px'}}>
     {data?.employee_id?.mobile_number}
     </span>
   </Typography>
    </div>

    <div style={{
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "center",
       marginBottom:'5px'
     }}>
    <Typography
     variant="p"
     fontSize={"12px"}
     fontWeight={"bold"}
     style={{color:'black',display: "flex",alignItems: "center"}}
   >
     <WhatsAppIcon style={{ color: "black",fontSize: "16px",marginTop:'-3px'}} />
     <span style={{marginLeft:'5px'}}>
     {data?.employee_id?.whatsapp_number}
     </span>
   </Typography>
    </div>

    <div style={{
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "center",
       marginBottom:'5px'
     }}>
    <Typography
     variant="p"
     fontSize={"12px"}
     fontWeight={"bold"}
     style={{color:'black',display: "flex",alignItems: "center"}}
   >
     <BloodtypeIcon style={{ color: "black",fontSize: "16px",marginTop:'-1px'}} />
     <span style={{marginLeft:'5px',textTransform: "uppercase"}}>
     {data?.employee_id?.blood_group}
     </span>
   </Typography>
    </div>

    <div style={{
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "center",
       marginBottom:'5px'
     }}>
    <Typography
     variant="p"
     fontSize={"12px"}
     fontWeight={"bold"}
     style={{color:'black',display: "flex",alignItems: "center"}}
   >
     <CakeIcon style={{ color: "black",fontSize: "16px",marginTop:'-3px'}} />
     <span style={{marginLeft:'5px'}}>
     {data?.employee_id?.date_of_birth}
     </span>
   </Typography>
    </div>

    <div style={{
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "center",
       marginBottom:'5px'
     }}>
    <Typography
     variant="p"
     fontSize={"12px"}
     fontWeight={"bold"}
     style={{color:'black',display: "flex",alignItems: "center"}}
   >
     <GradeIcon style={{ color: "black",fontSize: "16px",marginTop:'-3px'}} />
     <span style={{marginLeft:'5px'}}>
     {data?.employee_id?.grade}
     </span>
   </Typography>
    </div>
     </div>
   </Box>
   </div> :
   <div>
   <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15px"
  }}
>
  <Box sx={{ position: "relative" }}>
    {data?.user_image == undefined || data?.user_image == '' || data?.user_image == NaN ? (
      <Avatar
        src="/images/users/7.jpg"
        sx={{ width: 100, height: 100 }}
      ></Avatar>
    ) : (
      <Avatar
        src={data?.user_image}
        sx={{ width: 100, height: 100 }}
      ></Avatar>
    )}
  </Box>
</Box>
<Box>
 <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
 <Typography
  variant="p"
  fontSize={"16px"}
  fontWeight={"bold"}
  style={{color:'black',marginTop:'8px'}}
>
  {data?.first_name} {data?.last_name}
</Typography>
 </div>
<div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
<Typography
  variant="p"
  fontSize={"10px"}
  style={{color:'#00000057'}}
>
  Created Date {data?.created_f_date}
</Typography>
</div>
</Box>

<Box sx={{marginTop:'15px'}}>
  <div style={{borderTop: "2px solid #c9c9c926",padding:'15px'}}>
  <div style={{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  }}>
 <Typography
  variant="p"
  fontSize={"12px"}
  fontWeight={"bold"}
  style={{color:'black',display: "flex",alignItems: "center"}}
>
  <EmailIcon style={{ color: "black",fontSize: "16px",marginTop:'0px'}} />
  <span style={{marginLeft:'5px'}}>
  {data?.email}
  </span>
</Typography>
 </div>
  </div>
</Box>
</div> }
     
    
  </div>
  );
};

export default NavItem;
