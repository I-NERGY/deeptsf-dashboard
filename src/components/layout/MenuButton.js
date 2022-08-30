import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from "@mui/material/Stack";

export default function MenuButton({subLinks, signout}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AccountCircleIcon style={{color: '#fff', fontSize: '40px'}}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {subLinks.map(subPage => (
                    <div key={Math.floor(Math.random() * 10)}>
                        {subPage.link && <Link to={subPage.link} key={subPage.link}
                                               style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                            <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}
                                   alignItems={'center'} px={1} className={'iconButtonMenuItemStack'}>
                                {subPage.icon} <MenuItem className={'iconButtonMenuItem'}>{subPage.title}</MenuItem>
                            </Stack>
                        </Link>}
                        {subPage.signout && <span onClick={signout} key={subPage.link}
                                                  style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                                <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}
                                       alignItems={'center'} px={1} className={'iconButtonMenuItemStack'}>
                                    {subPage.icon} <MenuItem className={'iconButtonMenuItem'}>{subPage.title}</MenuItem>
                                </Stack>
                            </span>}
                    </div>
                ))}
            </Menu>
        </React.Fragment>
    );
}