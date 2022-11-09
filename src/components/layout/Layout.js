import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import {useLogout} from "../../hooks/useLogout";

import {styled, useTheme} from '@mui/material/styles';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UpdateIcon from '@mui/icons-material/Update';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import FooterContent from "../FooterContent";
import MenuButton from "./MenuButton";

import {appbarMenuButtonItems} from "../../appbarMenuButtonItems";

const drawerWidth = 260;

const useStyles = {
    active: {
        background: 'linear-gradient(45deg, #f4f4f4 30%, #f4f4f4 90%)',
    },
    nested: {
        paddingLeft: '30px !important',
    },
    avatar: {
        marginLeft: 3, marginTop: 1, color: 'white', '&:hover': {
            color: '#1A88C9',
        }
    }
};

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    flexGrow: 1, // padding: theme.spacing(3),
    paddingTop: theme.spacing(3), paddingBottom: theme.spacing(3), transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), marginLeft: `-${drawerWidth}px`, ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }), marginLeft: 0,
    }),
}),);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), background: theme.palette.barBackground.main, ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }),
    }), // backgroundColor: '#111'
    // ...(!open && {
    //     width: `calc(100% - 60px)`,
    //     marginLeft: `${drawerWidth}px`,
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // }),
}));

const Footer = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }),
    }), background: theme.palette.barBackground.main, boxShadow: 5
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), // necessary for content to be below app bar
    ...theme.mixins.toolbar, minHeight: '40px !important', justifyContent: 'flex-end',
}));

export default function Layout({children}) {
    const {user, roles} = useAuthContext()
    const {logout} = useLogout()
    const classes = useStyles;
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation()

    const menuItems = [{text: 'Home', icon: <HomeOutlinedIcon color="secondary"/>, path: "/",},]

    const [menu, setMenu] = useState(menuItems)

    const handleSignOut = () => {
        logout()
        setMenu(menuItems)
        navigate('/signin')
    }

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    useEffect(() => {
        if (roles?.length > 0 && (roles.includes('data_scientist') || roles.includes('inergy_admin'))) {
            menuItems.push(
                {text: 'Load Forecasting Pipeline', icon: <UpdateIcon color="secondary"/>, path: "/load-forecast"},
                {
                    text: 'MLFlow',
                    icon: <img src="/images/mlflow_logo.jpg" alt="" width={'25px'} style={{borderRadius: '50%'}}/>,
                    path: location.pathname + ' ',
                    link: 'http://131.154.97.48:5000/'
                },
                {text: 'Experiment Tracking', icon: <QueryStatsIcon color="secondary"/>, path: "/metrics"}
            )
            setMenu(menuItems)
        }

        if (roles?.length > 0 && roles.includes('energy_engineer')) {
            menuItems.push({text: 'Experiment Tracking', icon: <QueryStatsIcon color="secondary"/>, path: "/metrics"})
            setMenu(menuItems)
        }

        if (roles?.length > 1) {
            menuItems.push({text: 'System Monitoring', icon: <MonitorHeartIcon color="secondary"/>, path: "/monitoring"})
        }
    }, [roles])


    return (<React.Fragment>
        <Box sx={{display: 'flex', minHeight: `calc(100vh - 60px)`}}>
            <CssBaseline/>
            <AppBar position="fixed" open={drawerOpen}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, color: 'white', ...(drawerOpen && {display: 'none'})}}>
                        <MenuIcon/>
                    </IconButton>
                    <h3 style={{color: 'white'}}>I-NERGY Load Forecasting</h3>
                    {user && <React.Fragment>
                        <Typography style={{marginLeft: 'auto', color: 'white'}}>Welcome, {user.username}</Typography>
                        <MenuButton subLinks={appbarMenuButtonItems} signout={handleSignOut}/>
                    </React.Fragment>}
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                        width: drawerWidth, boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerOpen}>
                <DrawerHeader>
                    {/* Drawer top left banner logo */}
                    <img src="/images/i-nergy_logo_trans_back.png" alt="" height={'60px'} style={{objectFit: 'cover'}}/>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>

                <Divider/>

                <List>
                    {menu.map(item => (
                        <div key={item.text}>
                            <ListItemButton
                                onClick={item.handleNested ? item.handleNested : item.link ? () => window.open(item.link, '_blank') : () => navigate(item.path)}
                                key={item.text} className={location.pathname === item.path ? 'menuItemActive' : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}></ListItemText>
                                {item.subItems && (item.collapsed ? <ExpandLessIcon/> : <ExpandMoreIcon/>)}
                            </ListItemButton>
                            {item.subItems && item.subItems.map(subItem => (<Link key={subItem.text}
                                                                                  style={{
                                                                                      textDecoration: 'none',
                                                                                      color: '#000'
                                                                                  }}>
                                <Collapse in={item.collapsed} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 4}}
                                                        className={clsx(classes.nested, location.pathname === subItem.path ? 'menuItemActive' : null)}>
                                            <ListItemIcon>
                                                {subItem.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={subItem.text}/>
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </Link>))}
                        </div>))}
                </List>
                <Divider/>

                <List>
                    {!user && <SignedOutLinks navigate={navigate} location={location}/>}
                    {user && <SignedInLinks navigate={navigate} location={location} handleSignOut={handleSignOut}/>}
                </List>

            </Drawer>
            <Main open={drawerOpen} style={{overflow: 'hidden', paddingBottom: 0}}>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
        <Footer sx={{position: 'sticky', mt: 'auto'}} open={drawerOpen}><FooterContent/></Footer>
    </React.Fragment>);
}
