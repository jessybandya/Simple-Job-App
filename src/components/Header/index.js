import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../logo.svg';
import {Modal} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { updateAuthId } from '../../redux/dataSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SignIn from './SignIn';
import SignUp from './SignUp';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [modalShowAuth, setModalShowAuth] = React.useState(false);
  const [modalShowAbout, setModalShowAbout] = React.useState(false);
  const authId = useSelector((state) => state.authId);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  const logout = () => {
    auth.signOut();
    dispatch(updateAuthId(''))
    // window.location.reload();
}

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={logo} className="App-logo AppBar" alt="logo"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <i>Job-App</i>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          
        >
          <span style={{fontWeight:'bold'}} onClick={() => setModalShowAbout(true)}>About</span>
        </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={() => setModalShowAbout(true)}>
                  <Typography textAlign="center" style={{fontWeight:'bold'}}>About</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <img src={logo} className="App-logo AppBar1" alt="logo"/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <i>Job-App</i>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => setModalShowAbout(true)}
              >
                About
              </Button>
          </Box>

          {authId === '' ?(
            <MenuItem onClick={() => setModalShowAuth(true)}>
            <Typography textAlign="center" style={{fontWeight:'bold'}}>Sign In</Typography>
          </MenuItem>
          ):(
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar onClick={logout} style={{cursor:'pointer'}} alt="PIPO" src="https://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
          )}
        </Toolbar>
      </Container>


      <Modal
      show={modalShowAuth}
      onHide={() => setModalShowAuth(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Sign In" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      </Modal.Header>
      <Modal.Body>
      <Box sx={{ bgcolor: 'background.paper'}}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SignIn setModalShowAuth={setModalShowAuth}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUp setModalShowAuth={setModalShowAuth}/>
        </TabPanel>
      </SwipeableViews>
    </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShowAuth(false)}>Close</Button>
      </Modal.Footer>
    </Modal>



    <Modal
    show={modalShowAbout}
    onHide={() => setModalShowAbout(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
  <Modal.Header closeButton>
  <Modal.Title id="contained-modal-title-vcenter">
    Introduction 
  </Modal.Title>
</Modal.Header>
    <Modal.Body>
    <center><i style={{fontWeight:'bold'}}>Welcome to our website for Job Application!</i></center>
    <hr />
    <Typography variant="body2" color="text.secondary">
    Adding some content here :)
  </Typography>
  <br />
    </Modal.Body>
  </Modal>

    </AppBar>
  );
};
export default Header;
