import React from 'react'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { createTheme,ThemeProvider } from '@mui/system'
// import Container from '@mui/material/Container';
import laptop from "../Imgs/laptop.png"
import phone from "../Imgs/phone.png"
import Loginimg from './Loginimg';
import { auth,provider } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import  {useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cryptoactions } from '../Reduxstore';
function Login() {
 const history=useHistory()
const dispatch =useDispatch()

const SignHandler=()=>{

    signInWithPopup(auth, provider)
    .then((success)=>{
        history.push("./home")
        console.log(success)
        sessionStorage.setItem("login",true)
        sessionStorage.setItem("userimg",success.user.photoURL)
        sessionStorage.setItem("username",success.user.displayName)
        sessionStorage.setItem("userUid",success.user.uid)
        dispatch(cryptoactions.LoginHandler({img:success.user.photoURL,username:success.user.displayName,login:true,userUid:success.user.uid}))
    })
    .catch((error)=>{
        console.log(error)
    })
}
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  const SelectButton = styled('div')(({ theme }) => ({
    border: "1px solid gold",
    borderRadius:5,
    padding:10,
    paddingLeft:10,
    paddingRight:20,
    fontFamily:"Montserrat",
    cursor:"pointer",
    background:"gold",
    color:"black",
    fontWeight:700,
    "&:hover":{
        background:"gold",
        color:"black"
    },

}))





  const Sidebar = styled('div')(({ theme }) => ({
    width:"30%",
    marginLeft:"5%",
    [theme.breakpoints.down('md')]: {
      width:"100%",
      alignItems: 'center',
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop: 25,
 
  }));

  const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));
  


  return (
    // <ThemeProvider theme={darkTheme}>

    <Container>
    <Sidebar style={{marginTop:160}}>
    <Typography variant='h2' style={{fontFamily:"Montserrat",fontWeight:"bold",}}>Crypto Daily</Typography>
    <Typography variant='h5' style={{fontFamily:"Montserrat",fontWeight:"bold",marginTop:10}}>Sign In here</Typography>
    <SelectButton onClick={SignHandler} style={{textAlign:"center",minWidth:"100",marginTop:10,marginRight:2}}>Sign In</SelectButton>
    </Sidebar>

   <Loginimg/>

   
    </Container>

    // </ThemeProvider>
  )
}

export default Login
