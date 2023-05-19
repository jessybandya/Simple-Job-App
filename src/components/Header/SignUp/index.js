import * as React from 'react';
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
import logo from '../../../logo.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import { updateAuthId } from '../../../redux/dataSlice';
import swal from "@sweetalert/with-react";
import { Spin } from 'antd';

const theme = createTheme();

export default function SignUp({setModalShowAuth}) {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch();
    const authId = useSelector((state) => state.authId);
  
    React.useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if(user){
          const idTokenResult = await user.getIdTokenResult()
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token,
              
            }
          })
          dispatch(updateAuthId(user?.uid))
  
        }
      })
      return () => unsubscribe()
    }, [])
  
    const signUp = () =>{
      setLoading(true)
  
      if(!firstName){
          toast.error("First name is required!",{
              position: toast.POSITION.TOP_CENTER
          })
          setLoading(false)
      }else if(!lastName){
          toast.error("Last name is required!",{
              position: toast.POSITION.TOP_CENTER
          })
          setLoading(false)
      }else if(!email){
        toast.error("Email is required!",{
            position: toast.POSITION.TOP_CENTER
        })
        setLoading(false)
    }else if(!password){
        toast.error("Password is required!",{
            position: toast.POSITION.TOP_CENTER
        })
        setLoading(false)
    }else if(password.length <6){
        toast.error('Password must have atleast 6 characters!', {
          position: toast.POSITION.TOP_CENTER
      })
        setLoading(false)
      }else{
        db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

            // resultSnapShot is an array of docs where "email" === "user_mail"
    
            if (resultSnapShot.size == 0) {                      
                  auth
                  .createUserWithEmailAndPassword(email, password)
                  .then((auth) => {
                      if (auth.user) {
                          auth.user.updateProfile({
                              photoURL: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                          }).then((s) => {

                              db.collection('users').doc(auth.user.uid).set({
                                  uid: auth.user.uid,
                                  firstName,
                                  lastName,
                                  email,
                              }).then((r) => {
                                    setLoading(false)
                                    setModalShowAuth(false)
                                    swal("Succefully created an account!\n\nThank you!")
                                  })
                          })
                      }
                  })
                  .catch((e) => {
                          toast.error(e.message, {
                            position: toast.POSITION.TOP_CENTER
                        })
                          setLoading(false)
                  });
    
            } else {
                //Already registered
                setLoading(false)
                toast.error("The email you enterd already in use!", {
                  position: toast.POSITION.TOP_CENTER
              })
            }
    
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
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signUp}
            >
            {loading === true ?(
                <span><span style={{color:'#fff'}}>signing up...<Spin size="middle" /></span></span>
              ):(
                <span>Sign Up</span>
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}