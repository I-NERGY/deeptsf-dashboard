import React, {useState} from 'react';
import clsx from 'clsx';

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Link from '@mui/material/Link';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const SignedInLinks = ({classes, navigate, location, setAuth, handleSignOut}) => {
    const [nestedPilots, setNestedPilots] = useState(true)

    const handleNestedPilots = () => {
        setNestedPilots(!nestedPilots)
    }

    const pilotItems = [
        {
            text: 'Pilot Data',
            icon: <DataObjectIcon color="secondary"/>,
            subItems: [
                {text: 'ASM', icon: <FileOpenIcon color="secondary"/>, path: "/data/asm"},
                {text: 'BTC', icon: <FileOpenIcon color="secondary"/>, path: "/data/btc"},
                {text: 'COOPERNICO', icon: <FileOpenIcon color="secondary"/>, path: "/data/coopernico"},
                {text: 'EREN', icon: <FileOpenIcon color="secondary"/>, path: "/data/eren"},
                {text: 'FASADA', icon: <FileOpenIcon color="secondary"/>, path: "/data/fasada"},
                {text: 'GDYNIA', icon: <FileOpenIcon color="secondary"/>, path: "/data/gdynia"},
                {text: 'HOUSING EUROPE', icon: <FileOpenIcon color="secondary"/>, path: "/data/housing_europe"},
                {text: 'ICLEI', icon: <FileOpenIcon color="secondary"/>, path: "/data/iclei"},
                {text: 'LEIF', icon: <FileOpenIcon color="secondary"/>, path: "/data/leif"},
                {text: 'VEOLIA', icon: <FileOpenIcon color="secondary"/>, path: "/data/veolia"},
            ],
            handleNested: () => handleNestedPilots()
        },
    ]

    return (
        <React.Fragment>
            {pilotItems.map(item => (
                <div key={item.text}>
                    <ListItem
                        onClick={item.handleNested ? item.handleNested : () => navigate(item.path)}
                        button key={item.text}
                        className={location.pathname === item.path ? classes.active : null}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}></ListItemText>
                        {item.subItems && (nestedPilots ? <ExpandLessIcon/> : <ExpandMoreIcon/>)}
                    </ListItem>
                    {item.subItems && item.subItems.map(subItem => (
                        <Link to={subItem.path} onClick={() => navigate(subItem.path)}
                              style={{textDecoration: 'none', color: '#000'}} key={subItem.path}>
                            <Collapse in={nestedPilots} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button
                                              className={clsx(classes.nested, location.pathname === subItem.path ? classes.active : null)}>
                                        <ListItemIcon>
                                            {subItem.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.text}/>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Link>
                    ))}
                </div>
            ))}
            <Link href={'http://matrycs.epu.ntua.gr:7474/browser/'} target={'_blank'}
                  sx={{textDecoration: 'none', color: 'inherit'}}>
                <ListItem
                    button key={'Neo4J'}>
                    <ListItemIcon><img src="/images/neo4j_logo.png" alt="neo4j_logo" width={'22px'}
                                       style={{marginLeft: '2px'}}/></ListItemIcon>
                    <ListItemText primary={'Neo4J'}></ListItemText>
                </ListItem>
            </Link>
            <ListItem
                onClick={() => navigate('/user/profile')}
                button key={'My Profile'}
                className={location.pathname === '/user/profile' ? classes.active : null}
            >
                <ListItemIcon>{<AccountCircleIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'My Profile'}></ListItemText>
            </ListItem>

            <ListItem
                onClick={handleSignOut}
                button key={'Sign Out'}
            >
                <ListItemIcon>{<LogoutOutlinedIcon color="secondary"/>}</ListItemIcon>
                <ListItemText primary={'Sign Out'}></ListItemText>
            </ListItem>
        </React.Fragment>
    );
}

export default SignedInLinks;