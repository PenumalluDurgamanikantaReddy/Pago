import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import WatchItem from './WatchItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CoinList } from './Api';

import { Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function WatchlistSidebar() {
  const [state, setState] = React.useState({

    right: false,
  });
  const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
  const sybmol=useSelector((state)=>{ return state.crpyto.symbol}) 
  const watchlist = localStorage.getItem("watchlist")
  const itemAdded=useSelector((state)=>{ return state.crpyto.itemAdded}) 
    ? localStorage.getItem("watchlist").split(",")
    : [];
    const [coins, setCoins] = useState([]);

 

    
    const getData = async () => {
      // let response;
      let response = await axios.get(CoinList(cryptodata))
      console.log(response)
      let arrresponse=response.data
      var myCoins = arrresponse.filter((coins) =>  watchlist.includes(coins.id));
      console.log(myCoins)
      setCoins(myCoins);
    };

    useEffect(() => {
      getData();
    }, []);

  const Container=styled("div")(({ theme })=>({
    width:350,
    padding:25,
    height:"100%",
    display:'flex',
    flexDirection:"column",
    fontFamily:"Montserrat"
  }))
const Profile=styled("div")(({theme})=>({
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    height:"92%",
    gap:"10px"
}))
const Picture=styled("div")(({ theme})=>({
width:200,
height:200,
cursor:"pointer",
backgroundColor:"EEBC1D",
objectFit:"contain"
}))

const WatchlistConatiner=styled("div")(({theme})=>({
    flex:1,
    width:"100%",
    background:"grey",
    borderRadius:5,
    paddingTop:10,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:12,
    overflow:"scroll"

}))



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const userimg=sessionStorage.getItem("userimg")
  const username=sessionStorage.getItem("username")
  return (
    <div style={{marginLeft:25}}>
      {['right' ].map((anchor) => (
        <React.Fragment key={anchor}>
      
          <Avatar   onClick={toggleDrawer(anchor, true)}  style={{height:"38",width:"38",marginRight:10,cursor:"pointer"}}  src={userimg} alt={username}/>
  
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
       <Container>
       <Profile>
       <Picture>

       <Avatar   onClick={toggleDrawer(anchor, true)}  style={{width:"100%",height:"100%"}}  src={userimg} alt={username} />
       </Picture>
       <span style={{fontFamily:"Montserrat",fontWeight:"bold",fontSize:30,width:"100%",textAlign:"center"}}>{username}</span>

       <WatchlistConatiner>
       <span style={{fontSize:15,textShadow:"0 0 5px black"}}>
       WatchList
       <ul>
       {
        coins.map((each)=>{
          console.log(each.id)
          
          return( <WatchItem data={each} id={each.id} img={each.image} current_price={each.current_price}></WatchItem>)
        })
       }
       </ul>
       </span>
       </WatchlistConatiner>

       </Profile>
 <div style={{height:"8%"}}>

 </div>
       </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}