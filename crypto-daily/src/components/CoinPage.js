import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import axios from "axios"
import { SingleCoin } from './Api'
import Coininfo from './Coininfo'
import { Typography } from '@mui/material';
import "./coinpage.css"
import { numberWithCommas } from './banner/Carousel';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import { cryptoactions } from '../Reduxstore';
import { addToWatchlist, removeFromWatchlist }  from "./Watchlist"

function Coinpage() {
  const {coinid} =useParams()
  const [coin,Setcoin] = useState()
  const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
  const sybmol=useSelector((state)=>{ return state.crpyto.symbol})
  // const userUid=useSelector((state)=>{ return state.crpyto.userdata.userUid})
  // const watchlist=useSelector((state)=>{ return state.crpyto.watchlist})
  const dispatch=useDispatch()

  const isWatchlist = localStorage.getItem("watchlist")
  ? localStorage.getItem("watchlist").includes(coinid)
  : false;
const [isAdded, setIsAdded] = useState(false);



const fetchCoinHandler= async()=>{
  const {data}= await axios.get(SingleCoin(coinid))
  Setcoin(data)
}


const itemadded=()=>{
  dispatch(cryptoactions.itemadded({new:1}))
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


const Sidebar = styled('div')(({ theme }) => ({
  width:"30%",
  [theme.breakpoints.down('md')]: {
    width:"100%",
    alignItems: 'center',
  },
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  marginTop: 25,
  borderRight: "2px solid grey"
}));

const Marketdata = styled('div')(({ theme }) => ({
alignSelf:"start",
padding:25,
paddingTop:10,
width:"100%",
[theme.breakpoints.down("mid")] : {
display:"flex",
justifyContent:"space-around",
},
[theme.breakpoints.down('sm')] : {
  flexDirection: "column",
    alignItems: "center",
},
[theme.breakpoints.down("xs")] : {
  alignItems:"start"
}

}));
useEffect(()=>{
  itemadded()
  
},[isAdded])
const DiscriptioTypgrahpy=styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
  }));

  const HeadingTypography=styled(Typography)(({theme})=>({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",

  }))
  
  const PricessTypography=styled(Typography)(({theme})=>({
    fontWeight: "600",
    marginBottom: 20,
    fontFamily: "Montserrat",
    fontSize:"2rem",
    [theme.breakpoints.down("xl")]:{
      fontSize:"rem",
      marginTop:40,
      fontWeight: "500",
    }

  }))
  useEffect(() => {
    fetchCoinHandler()
  }, [])






if(!coin)return "isloading"
  return (
<Container>
  <Sidebar>
  <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:"30px"}}  />
  <HeadingTypography  variant="h3" style={{fontWieght:"bold",fontFamily:"Montserrat",marginBottom:"25"}}>{coin?.name}</HeadingTypography>
  <DiscriptioTypgrahpy  variant='subtitle'>{coin?.description.en.split(". ")[0]}</DiscriptioTypgrahpy>
<Marketdata>

  <span style={{display:"flex"}}>
<HeadingTypography   variant="h4" >Rank:</HeadingTypography>
 &nbsp;  &nbsp;
<Typography variant="h4"  style={{marginTop:2}}>{coin?.market_cap_rank}</Typography>
  </span>
  <span style={{display:"flex"}}>
  <HeadingTypography   variant="h4" >Current Price: &nbsp; {sybmol}</HeadingTypography>
   &nbsp;  &nbsp;
  <PricessTypography >
   {" "} {numberWithCommas(coin?.market_data.current_price[cryptodata.toLowerCase()])}

  </PricessTypography>
    </span>
    <span style={{display:"flex"}}>
    <HeadingTypography   variant="h4" >Market Cap:&nbsp;&nbsp;&nbsp;&nbsp;{"      "}{sybmol}</HeadingTypography>
     &nbsp;  &nbsp;
    <PricessTypography  variant="h4" >{numberWithCommas(coin?.market_data.market_cap[cryptodata.toLowerCase()].toString().slice(0,6))}</PricessTypography>
      </span>
      {isWatchlist || isAdded 
        ? <Button  onClick={() => { setIsAdded(false);removeFromWatchlist(coin.id);}} variant='outlined' style={{width:"100%",height:40,backgroundColor:"red",color:"white"}}>{"Remove from Wishlist"}</Button>
        : <Button onClick={() => { setIsAdded(true);     addToWatchlist(coin.id) ;}}  variant='outlined' style={{width:"100%",height:40,backgroundColor:"gold",color:"black"}}>{"Add to Wishlist"}</Button>
      }
      
      </Marketdata>
  </Sidebar>
  <Coininfo coin={coin}/>
   </Container>
  )
}

export default Coinpage
