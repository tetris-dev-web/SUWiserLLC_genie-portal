import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TimelineIcon from '@mui/icons-material/Timeline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import SettingsIcon from '@mui/icons-material/Settings';

export default function NavItems(props) {
  const navListItems = [
    {
      action : 'dashboard',
      title : 'Dashboard',
      icon : <DashboardIcon />
    },
    {
      action : 'profile',
      title : 'My Profile',
      icon : <AccountCircleIcon />
    },
    {
      action : 'portfolio',
      title : 'Portfolio',
      icon : <PermContactCalendarIcon />
    },
    {
      action : 'transaction',
      title : 'Transaction History',
      icon : <TimelineIcon />
    },
    {
      action : 'wallet',
      title : 'Wallet',
      icon : <CurrencyExchangeIcon />
    },
    {
      action : 'referral',
      title : 'Referral',
      icon : <SocialDistanceIcon />
    },
    {
      action : 'settings',
      title : 'Settings',
      icon : <SettingsIcon />
    },
  ]

  return (
    <React.Fragment>
      {navListItems.map(item => (  
        <ListItemButton onClick={() => {props.onClick(item.title, item.action);}} key = {item.action}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      ))}      
    </React.Fragment>    
  );
}