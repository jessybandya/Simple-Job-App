import { List, TableCell, TableRow } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { db } from '../../../../../../../components/firebase';
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  
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


function Post({ jobId, applicantID, lastName, firstName, timestamp, email, score}) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose3 = () => {
        setOpen(false);
      };

    const removeApplicant = () =>{
        if(window.confirm(`Are you sure you want to remove applicant: ${firstName} ${lastName}`)){
            db.collection("jobs").doc(jobId).collection("applicants").doc(applicantID).delete().then(function() {
            }).catch(function(error) {
                toast.error("Error removing post: ", error);
            }); 
            toast.success(`Applicant ${firstName} ${lastName} has been removed successfully!`)   
          }
      }

    var d = timestamp;
//var d =val.timestamp;

//NB: use + before variable name
var date = new Date(+d);
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

  return (
    <>
    <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell style={{color:'#2a68af'}}> 
    {firstName}        
    </TableCell>
    <TableCell style={{color:'#2a68af'}} align='right'>
    {lastName}               
    </TableCell>
    <TableCell style={{color:'#2a68af'}} align='right'>
     {email}         
    </TableCell>
    <TableCell style={{color:'#2a68af'}} align='right'>
    {score}         
   </TableCell>
   <TableCell align='right'>
   {date.toDateString()} 
  </TableCell>

 <TableCell align='right'>
 <DeleteForeverIcon onClick={removeApplicant} fontSize='medium' style={{color:'#2a68af',cursor:'pointer'}}/>                
                 
</TableCell>
</TableRow>

</>
  )
}

export default Post