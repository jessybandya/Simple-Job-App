import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../../components/firebase';
import Addjob from './Addjob';
import Alljobs from './Alljobs';

const date = new Date;
let hours = date.getHours();

let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
function Electronics() {
    const [modalShow, setModalShow] = React.useState(false);
    const [posts1, setPosts1] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredPosts, setFilteredPosts] = React.useState([]);
  
    React.useEffect(() => {
      db.collection('jobs').onSnapshot((snapshot) => {
        setPosts1(snapshot.docs.map((doc) => doc.data()))
      })
  
      if (posts1 !== undefined) {
        const finalPosts = posts1.filter(res => {
          return res.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })
  
        setFilteredPosts(finalPosts)
      }else {
        return <div>No results3</div>
      }
    }, [searchTerm])
  
    const updateSearchResults = (e) => {
      setSearchTerm(e.target.value)
      // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
    }
  return (
    <div style={{padding:10}}>
    <span style={{fontWeight:'bold',fontSize:16,margin:5}}>{status}, Admin</span>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >

    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search job by title..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>

    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
    <DriveFolderUploadIcon onClick={() => setModalShow(true)} style={{color:'#2a68af'}}/>
  </IconButton>  
  </Paper> 
  
  <Alljobs filteredPosts={filteredPosts} searchTerm={searchTerm}/>


  <Modal
  show={modalShow}
  style={{zIndex:2000}}
  onHide={() => setModalShow(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
>
  <Modal.Header style={{justifyContent:'space-between'}}>
    <Modal.Title id="contained-modal-title-vcenter">
      Add Job
    </Modal.Title>
    <div><CloseIcon style={{cursor:'pointer'}} fontSize='large' onClick={() => setModalShow(false)}/></div>
  </Modal.Header>
  <Modal.Body>
    <Addjob setModalShow={setModalShow} />
  </Modal.Body>
</Modal>
    </div>
  )
}

export default Electronics