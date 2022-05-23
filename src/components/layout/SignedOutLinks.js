import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";

const SignedOutLinks = ({classes, navigate, location}) => {
    return (
        <React.Fragment>
            <ListItem
                onClick={() => navigate('/signin')}
                button key={'SignIn'}
                className={location.pathname === '/signin' ? classes.active : null}
            >
                <ListItemIcon>{<LoginOutlinedIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'SignIn'}></ListItemText>
            </ListItem>
            {/*<ListItem*/}
            {/*    onClick={() => navigate('/signup')}*/}
            {/*    button key={'Sign Up'}*/}
            {/*    className={location.pathname === '/signup' ? classes.active : null}*/}
            {/*>*/}
            {/*    <ListItemIcon>{<AppRegistrationOutlinedIcon color="secondary"/>}</ListItemIcon>*/}
            {/*    <ListItemText primary={'Sign Up'}></ListItemText>*/}
            {/*</ListItem>*/}
        </React.Fragment>
    );
}

export default SignedOutLinks;