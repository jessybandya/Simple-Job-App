import React from 'react'
import { db } from '../../../../../components/firebase';
import Allapplicants from './Allapplicants';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Applicants({jobId}) {
  const [modalShow, setModalShow] = React.useState(false);
  const [posts1, setPosts1] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);

  React.useEffect(() => {
    db.collection('jobs').doc(jobId).collection("applicants").onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
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
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >

    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search applicant by first name..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton> 
  </Paper> 
  
  <Allapplicants filteredPosts={filteredPosts} jobId={jobId} searchTerm={searchTerm}/>

    </div>
  )
}

export default Applicants