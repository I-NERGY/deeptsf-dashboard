import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const appbarMenuButtonItems = [
    {title: 'My Profile', icon: <AccountCircleIcon color={'secondary'}/>, link: '/user/profile'},
    {title: 'Sign Out', icon: <LogoutOutlinedIcon color={'secondary'}/>, signout: 'signout'},
]