import React from 'react'
import { db } from '../../../../../../components/firebase';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Post from './Post';

function Alljobs({ filteredPosts, searchTerm, jobId }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const menusPerPage = 100;
    const pagesVisited = pageNumber * menusPerPage;
  
    const pageCount = Math.ceil(posts.length / menusPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}}>FIRST NAME</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">LAST NAME</TableCell>
          <TableCell style={{minWidth:170,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">EMAIL</TableCell>
          <TableCell style={{minWidth:170,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">SCORE</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">DATE APPLIED</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {searchTerm === "" ?(
          posts?.length > 0 ?(
             <>
             {
                 posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post}) => (
                    <Post
                    key={id} 
                    applicantID={id}
                    firstName={post.firstName}
                    lastName={post.lastName}
                    email={post.email}
                    score={post.score}
                    timestamp={post.timestamp}
                    jobId={jobId}
                    />
                  ))
  }
             </>
          ):(
            <div style={{display:'table',margin:'auto',fontSize:18,fontWeight:'bold'}}>No event here yet!</div>
          )
       ):(
        <>
        {
         filteredPosts.length > 0 ?(
           <>
           {
                           filteredPosts.map((posts2) => (
 
 <Post 
 applicantID={posts2.applicantID}
 firstName={posts2.firstName}
 lastName={posts2.lastName}
 email={posts2.email}
 score={posts2.score}
 timestamp={posts2.timestamp}
 jobId={jobId}
 />
 ))
                           }
           </>
         ):(
           <><center style={{fontWeight:'bold'}}><h5>No results...</h5></center></>
         )       
       
       }
        </>
       )}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  )
}

export default Alljobs