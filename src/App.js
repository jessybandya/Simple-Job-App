import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SignIn from './components/Header/SignIn';
import SignUp from './components/Header/SignUp';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';


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

function App() {
  const authId = useSelector((state) => state.authId);
  const [modalShowAuth, setModalShowAuth] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div>
     <Header />
     {authId !== '' ?(
      <Home />
     ):(
      <div style={{
        margin:'auto',
        display:'table',
        marginTop:200
      }}>
      <Button onClick={() => setModalShowAuth(true)} variant="contained"  disableElevation>
     Click here to sign in to view the panel
</Button>
      </div>
     )}


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
    </div>
  );
}

export default App;
