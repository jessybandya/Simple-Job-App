import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../../../logo.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import swal from "@sweetalert/with-react";
import { Spin } from 'antd';
import { db } from '../../../../components/firebase';

const theme = createTheme();

function Addjob({setModalShow}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const jobId = db.collection('jobs').doc().id

    const addJob = () =>{
        setLoading(true)
       if(!title){
              toast.error("Title is required!",{
                    position: toast.POSITION.TOP_CENTER
              })
                setLoading(false)
       }else if(!description){
        toast.error("Description is required!",{
              position: toast.POSITION.TOP_CENTER
        })
          setLoading(false)
     } else{
        db.collection("jobs").doc(jobId).set({
            title,
            description,
            jobId,
            timestamp: Date.now()
        }).then((r) => {
            setLoading(false)
            setModalShow(false)
            swal("Successfully added a job!")
        })
     }   
    }
    
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      <img src={logo} className="App-logo AppBar" alt="logo"/>

        <Typography component="h1" variant="h5">
          Add Job
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
            required
            fullWidth
            id="Description"
            label="Description"
            name="Description"
            autoComplete="family-name"
            onChange={(e) => setDescription(e.target.value)}
          />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={addJob}
          >
          {loading === true ?(
              <span><span style={{color:'#fff'}}>Adding...<Spin size="middle" /></span></span>
            ):(
              <span>Add Job</span>
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default Addjob