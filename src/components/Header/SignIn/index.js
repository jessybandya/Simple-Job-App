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
import { toast } from 'react-toastify'
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateAuthId } from '../../../redux/dataSlice';
import { Spin } from 'antd';


const theme = createTheme();

export default function SignIn({setModalShowAuth}) {
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

  const signIn = () =>{
    setLoading(true)

    if(!email){
        toast.error("Email is required!",{
            position: toast.POSITION.TOP_CENTER
        })
        setLoading(false)
    }else if(!password){
        toast.error("Password is required!",{
            position: toast.POSITION.TOP_CENTER
        })
        setLoading(false)
    }else{
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>{
          setLoading(false)
          setModalShowAuth(false)
        //   window.location.reload();
        })
        .catch((e) =>{
                toast.error(e.message, {
                  position: toast.POSITION.TOP_CENTER
              })      
              setLoading(false)     
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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signIn}
            >
            {loading === true ?(
                <span><span style={{color:'#fff'}}>signing in...<Spin size="middle" /></span></span>
              ):(
                <span>Sign In</span>
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}