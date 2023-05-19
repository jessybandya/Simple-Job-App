import { List, TableCell, TableRow } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { db } from '../../../../../components/firebase';
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
import Applicants from '../Applicants';


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
function Post({ jobId, title,description,timestamp}) {
    const [open, setOpen] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0);
    const [input, setInput] = React.useState("");

     React.useEffect(() => {
         db.collection('jobs').doc(jobId).collection("applicants").orderBy("timestamp","desc").onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose3 = () => {
        setOpen(false);
      };

    const deleteJob = () =>{
        if(window.confirm(`Are you sure you want to delete job: ${title}`)){
            db.collection("jobs").doc(jobId).delete().then(function() {
            }).catch(function(error) {
                toast.error("Error removing post: ", error);
            }); 
            toast.success(`Job ${title} has been deleted successfully!`)   
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
    {title}        
    </TableCell>
    <TableCell style={{color:'#2a68af'}} align='right'>
    {description}               
    </TableCell>
    <TableCell style={{color:'#2a68af'}} align='right'>
    <RemoveRedEyeIcon onClick={handleClickOpen} fontSize='medium' style={{color:'#2a68af',cursor:'pointer'}}/> <span style={{fontWeight:'bold'}}>{posts.length}</span>       
    </TableCell>
   <TableCell align='right'>
   {date.toDateString()} 
  </TableCell>

 <TableCell align='right'>
 <DeleteForeverIcon onClick={deleteJob} fontSize='medium' style={{color:'#2a68af',cursor:'pointer'}}/>               
                 
</TableCell>
</TableRow>





<Dialog
fullScreen
open={open}
onClose={handleClose3}
TransitionComponent={Transition}
sx={{ zIndex: 1000}}
>
<AppBar style={{backgroundColor:'#2a68af'}} sx={{ position: 'fixed' }}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      onClick={handleClose3}
      aria-label="close"
    >
      <CloseIcon style={{color:"#fff"}}/>
    </IconButton>
    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
    
  </Typography>
    <Button style={{backgroundColor:'#fff',border:'1px solid #2a68af', color:'#2a68af'}} autoFocus onClick={handleClose3}>
      Close
    </Button>
  </Toolbar>
  </AppBar>

   <List style={{marginTop:60}}>
     <Applicants jobId={jobId}/>
   </List>
  </Dialog>

</>
  )
}

export default Post