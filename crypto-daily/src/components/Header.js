import React from 'react'
import "./header.css"
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cryptoactions } from '../Reduxstore';
import { useEffect,useState } from 'react';
import { Avatar } from '@mui/material';
import { doc } from "firebase/firestore"
import { db } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import WatchlistSidebar from './WatchlistSidebar';

function Header() {
const history=useHistory()
const dispatch=useDispatch()
const [curreny,SetuseState]=useState("INR")
const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
const sybmol=useSelector((state)=>{ return state.crpyto.symbol}) 
const userdata=useSelector((state)=>{ return state.crpyto.userdata})
const userUid=useSelector((state)=>{ return state.crpyto.userdata.userUid})
const islogin=useSelector((state)=>{ return state.crpyto.islogin})
const login=sessionStorage.getItem("login")
const historyHandler=()=>{
  console.log(islogin)
  if(login){
    history.push("/home")
  }
  
}
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const userUidd = userdata?.userUid;
const currencyHandler=(event)=>{
  // console.log(event.target.value)
  dispatch(cryptoactions.cuurencyChange(event.target.value))

}
// console.log(cryptodata)
useEffect(()=>{
  SetuseState(cryptodata)
  // 
// console.log(sybmol)
},[cryptodata])


useEffect(()=>{
if(userUidd){
  const addCoinRef =doc(db,"watchlist",userUid)
  var unsubscribe = onSnapshot(addCoinRef, (coin) => {
    if (coin.exists()) {
      // console.log(coin.data().coins);
      dispatch(cryptoactions.Setwatchlist(coin.data().coins))
      
    } else {
      console.log("No Items in Watchlist");
    }
  });

  return () => {
    unsubscribe();
  };

}
  
},[userUidd])
const Profile=styled("div")(({ theme })=>({
  display:'flex',
  justifyContent:"space-around",
  paddingLeft:"2rem",
   marginLeft:20, 
  alignItems:"center",
  alignContent:"center",
  [theme.breakpoints.down("md")] :{


  }
}))
const userimg=sessionStorage.getItem("userimg")
const username=sessionStorage.getItem("username")
  return (
    <ThemeProvider theme={darkTheme}>
 <AppBar position="static" color='transparent'>
 <Container>
 <Toolbar style={{marginLeft:10}}>
 <Typography variant='h6'   onClick={historyHandler} className='typo'  style={{fontWeight:"bold"}} >Crypto Daily</Typography>
 
 <Select  onChange={currencyHandler} value={curreny} variant='outlined' style={{width:100,height:50,marginRight:10 }}>
 <MenuItem value={"INR"}>INR</MenuItem>
 <MenuItem  value={"USD"}>USD</MenuItem>
 </Select>

 {login && <WatchlistSidebar/>}
 </Toolbar>

 </Container>
 </AppBar>
 </ThemeProvider>
  )
}
// <Profile>

// <strong>{username}</strong>
// </Profile>
export default Header
