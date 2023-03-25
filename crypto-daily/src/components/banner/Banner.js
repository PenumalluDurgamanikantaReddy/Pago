import React from 'react'
import "./banner.css"
import Container from '@mui/material/Container';
import bannerimg from '../../Imgs/bannerimg.jpg'
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from "axios"
import Carousel from './Carousel';
function Banner() {
    // useEffect(()=>{
    //     axios.get("https://api.coingecko.com/api/v3/search/trending")
    //     .then((success)=>{
    //     // console.log(success)
    //     })


    // },[])
  return (
    <div className='banner' >
    <Container className='bannerContent'>
    <div className='tagline'>
    <Typography variant='h2' style={{fontFamily:"Montserrat",fontWeight:"bold",marginBottom:15}}>Crypto Daily</Typography>
    <Typography variant='subtitle2' style={{color:"white",fontFamily:"Montserrat"}}>Get all types of updates on your favorite cryptocurrency</Typography>
    </div>  
    <Carousel/>
    </Container>

    </div>
  )
}

export default Banner
