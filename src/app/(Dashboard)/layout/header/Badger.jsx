import { useState } from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Define a functional component
function BadgerComponent() {
    // Use useState to manage the badge content
    const [badgeContent, setBadgeContent] = useState(4);

    return (
    <>
        {/*  <Badge badgeContent={badgeContent} color="success" style={{marginRight: "10px"}}  sx={{ "& .MuiBadge-badge": { borderRadius: '5px',
         top: '4px',
         fontSize: '12px',
         padding: '0',
         minWidth: '17px',
         height: '17px',
         right: '1px'} }}>
             <NotificationsIcon style={{color:'white',fontSize:'20px'}} color="action" />
         </Badge> */}
        </>
    );
}

export default BadgerComponent;