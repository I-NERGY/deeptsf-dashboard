import React from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {createTheme} from '@mui/material/styles'
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
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import FooterContent from "../FooterContent";
import {appbarMenuButtonItems} from "../../appbarMenuButtonItems";
import MenuButton from "./MenuButton";

const drawerWidth = 260;

const useStyles = {
    active: {
        background: 'linear-gradient(45deg, #f4f4f4 30%, #f4f4f4 90%)',
    }, nested: {
        paddingLeft: '30px !important',
    }, avatar: {
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
    const {auth, setAuth} = useAuth()
    const classes = useStyles;
    const theme = useTheme();
    const navigate = useNavigate();

    const location = useLocation()

    const handleSignOut = () => {
        setAuth({})
        localStorage.clear()
        navigate('/signin')
    }

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    const menuItems = [{
        text: 'Home', icon: <HomeOutlinedIcon color="secondary" className={classes.menuButtonColor}/>, path: "/"
    },
        // {
        //     text: 'Οι συσκευές μου',
        //     icon: <LoginOutlinedIcon color="secondary"/>,
        //     path: "/appliances",
        //     subItems: [
        //         {text: 'Όλες', icon: <LoginOutlinedIcon color="secondary"/>, path: "/appliances"},
        //         {text: 'Κλιματιστικά', icon: <LoginOutlinedIcon color="secondary"/>, path: "/airconditions"},
        //         {text: 'Θερμοσίφωνες', icon: <LoginOutlinedIcon color="secondary"/>, path: "/boilers"},
        //     ],
        //     collapsed: nestedAppliances,
        //     handleNested: () => handleNestedAppliances()
        // },
    ]

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
                    {/* Appbar main logo */}
                    {/*<img src={'/images/i-nergy_logo_trans_back.png'}*/}
                    {/*     style={drawerOpen ? {display: 'none', height: '50px'} : {*/}
                    {/*         display: 'block', height: '50px'*/}
                    {/*     }}/>*/}
                    {auth.username && <React.Fragment>
                        <Typography style={{marginLeft: 'auto', color: 'white'}}>Welcome, {auth.username}</Typography>
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
                    {menuItems.map(item => (
                        <div key={item.text}>
                            <ListItem
                                onClick={item.handleNested ? item.handleNested : () => navigate(item.path)}
                                button key={item.text}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}></ListItemText>
                                {item.subItems && (item.collapsed ? <ExpandLessIcon/> : <ExpandMoreIcon/>)}
                            </ListItem>
                            {item.subItems && item.subItems.map(subItem => (<Link key={subItem.text} to={subItem.path}
                                                                                  style={{
                                                                                      textDecoration: 'none',
                                                                                      color: '#000'
                                                                                  }}>
                                <Collapse in={item.collapsed} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button sx={{pl: 4}}
                                                  className={clsx(classes.nested, location.pathname === subItem.path ? classes.active : null)}>
                                            <ListItemIcon>
                                                {subItem.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={subItem.text}/>
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </Link>))}
                        </div>))}
                    {!auth.username && <React.Fragment>
                        <SignedOutLinks classes={classes} navigate={navigate} location={location}/>
                    </React.Fragment>}
                    {auth.username && <React.Fragment>
                        <SignedInLinks classes={classes} navigate={navigate} location={location} setAuth={setAuth}
                                       handleSignOut={handleSignOut}/>
                    </React.Fragment>}
                </List>

                <Divider/>

            </Drawer>
            <Main open={drawerOpen} style={{overflow: 'hidden', paddingBottom: 0}}>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
        <Footer sx={{position: 'sticky', mt: 'auto'}} open={drawerOpen}><FooterContent/></Footer>
    </React.Fragment>);
}
