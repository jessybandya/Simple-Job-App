import React from 'react'
import { db } from '../../../../components/firebase';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Post from './Post';

function Alljobs({ filteredPosts, searchTerm }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [posts, setPosts] = React.useState([])
      const [pageNumber, setPageNumber] = React.useState(0);
      const [input, setInput] = React.useState("");
  
       React.useEffect(() => {
           db.collection('jobs').orderBy("timestamp","desc").onSnapshot(snapshot => {
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
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}}>TITLE</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">DESCRIPTION</TableCell>
          <TableCell style={{minWidth:170,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">APPLY</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#2a68af",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">DATE POSTED</TableCell>
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
                    jobId={id}
                    title={post.title}
                    description={post.description}
                    timestamp={post.timestamp}
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
 jobId={posts2.jobId}
 title={posts2.title}
 description={posts2.description}
 timestamp={posts2.timestamp}
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