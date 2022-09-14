import React, {useState} from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const SignedInLinks = ({classes, navigate, location, setAuth, handleSignOut}) => {

    return (
        <>
            <ListItemButton
                onClick={() => navigate('/user/profile')}
                key={'My Profile'}
                className={location.pathname === '/user/profile' ? 'menuItemActive' : null}
            >
                <ListItemIcon>{<AccountCircleIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'My Profile'}></ListItemText>
            </ListItemButton>

            <ListItemButton
                onClick={handleSignOut}
                key={'Sign Out'}
            >
                <ListItemIcon>{<LogoutOutlinedIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'Sign Out'}></ListItemText>
            </ListItemButton>
        </>
    );
}

export default SignedInLinks;