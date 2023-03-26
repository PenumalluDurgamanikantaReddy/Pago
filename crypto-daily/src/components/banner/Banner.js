import React from 'react'
import "./banner.css"
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';

import Carousel from './Carousel';
function Banner() {

  const Typography=styled(("div"))(({theme})=>({
    fontSize:"4rem",
    fontWeight:"bold",
    [theme.breakpoints.down('sm')] : {
      flexDirection: "column",
        alignItems: "center",
        fontSize:"3rem"},
        fontWeight:"bold",
        [theme.breakpoints.down("xl")] : {
          alignItems:"start",
          fontSize:"1.5rem",
   
          fontWeight:"bold",
        }
  }))
  const Typographyy=styled(("div"))(({theme})=>({
    fontSize:"4rem",
    fontWeight:"400",
    color:"white",
    fontSize:"1rem",
    [theme.breakpoints.down('sm')] : {
      flexDirection: "column",
        alignItems: "center",
        fontSize:"3rem",
        fontWeight:"400"},
        [theme.breakpoints.down("xl")] : {
          alignItems:"start",
          fontWeight:"400",
          fontSize:"1rem",
         color:"white"
        }
  }))

  const Bannerco=styled("div")(({theme})=>({
    height: "80%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    paddingTop:"40",

    justifyContent:"space-around",


  }))

  return (
    <div className='banner' >
    <Container className='bannerContent'>
    <div className='tagline'>
    <Typography  style={{fontFamily:"Montserrat"}}>Crypto Daily</Typography>
    <Typographyy  style={{fontFamily:"Montserrat"}}>Get all types of updates on your favorite cryptocurrency</Typographyy>
    </div>  
    <Carousel/>
    </Container>

    </div>
  )
}

export default Banner
