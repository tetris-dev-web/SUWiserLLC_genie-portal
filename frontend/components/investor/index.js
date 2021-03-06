import * as React from 'react';
import { connect } from "react-redux";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import NavItems from './leftNavigation';
import Dashboard from './dashboard'
import OWLogo from "../../images/icons/ow-logo.svg";

const { merge } = require("lodash");

import { getETH2USD } from '../../actions/currency_actions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        OwnShare
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => {
  let originalStyle = {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }

  if (open) {
    originalStyle = merge({}, originalStyle, {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    });
  }

  return originalStyle;
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    let originalStyle = {
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
      }
    }

    if (!open) {
      originalStyle = merge({}, originalStyle, {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      });
    }
    return originalStyle;
  }
);

const mdTheme = createTheme();

const InvestorDashboard = (props) => {
  const {updateSettingsCurrency, updateSettingsETH2USD} = props;

  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("Dashboard");
  const [selAction, setSelAction] = React.useState("dashboard");
  const [currency, setCurrency] = React.useState('wei');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavClick = (title, action) => {
    setTitle(title);
    setSelAction(action);
  }

  const handleCurrencyChange = (event) => {
    if (String(event.target.value).toLowerCase() == 'usd') {
      getETH2USD().then(response => {
        updateSettingsETH2USD(response.data.rates.USD);
        updateSettingsCurrency(event.target.value);
        setCurrency(event.target.value);
      });
    } else {
      updateSettingsCurrency(event.target.value);
      setCurrency(event.target.value);

    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                // ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            {false &&
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            }
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Currency"
              variant="standard"
              color = "primary"
              onChange={handleCurrencyChange}
            >
              <MenuItem value='wei'>WEI</MenuItem>
              <MenuItem value='eth'>ETH</MenuItem>
              <MenuItem value='usd'>USD</MenuItem>
            </Select>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Link href="/" underline="none">
            <img className="gen-logo" src={OWLogo} style={{ marginTop: 15 }} />
            </Link>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <NavItems onClick={handleNavClick} ></NavItems>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {selAction == 'dashboard' && <Dashboard />}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    web3: state.network.web3,
    account: state.network.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSettingsCurrency: (currency) => dispatch({
      type : 'SETTINGS_UPDATE_CURRENCY',
      currency : currency
    }),
    updateSettingsETH2USD: (rate) => dispatch({
      type : 'SETTINGS_UPDATE_ETH2USD',
      eth2usd : rate
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDashboard);