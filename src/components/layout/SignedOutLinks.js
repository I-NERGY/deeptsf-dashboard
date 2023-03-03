import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const SignedOutLinks = ({navigate, location}) => {
    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => navigate('/signin')} key={'SignIn'}
                className={location.pathname === '/signin' ? 'menuItemActive' : null}
            >
                <ListItemIcon>{<LoginOutlinedIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'SignIn'}></ListItemText>
            </ListItemButton>
        </React.Fragment>
    );
}

export default SignedOutLinks;