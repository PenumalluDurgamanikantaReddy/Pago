import React,{useState} from 'react'
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { addToWatchlist, removeFromWatchlist }  from "./Watchlist"
import { styled } from '@mui/material/styles';
function WatchItem(props) {
  const  coinid=props.id

    const currentprice=props.current_price
    const isWatchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").includes(coinid)
    : false;
  const [isAdded, setIsAdded] = useState(false);

const deletehandler=()=>{
  console.log("watchlisdelete")
  setIsAdded(false)
  removeFromWatchlist(coinid)
}

const Fontco=styled("div")(({theme})=>({

  paddingBottom:5,
  marginRight:5,
  paddingTop:5,
  marginTop:20,
  fontWeight:"400",
  display:"flex",
  alignItems:"center",
  alignContent:"left",
  borderRadius:"5px",
  backgroundColor:"black",
  justifyContent:"space-between",
  width:"110%",

  [theme.breakpoints.down("xl")]:{

    borderRadius:"2px",
    paddingBottom:2,
    paddingTop:2,
    width:"140%",
    display:"flex",
    alignItems:"center",
    alignContent:"center",
    justifyContent:"space-around",
    marginTop:20,
    marginRight:25,
    paddingLeft:10,
    fontSize:"1",
  }

}))

const sybmol=useSelector((state)=>{ return state.crpyto.symbol})
const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
  return (
    <Container >
      <Fontco>
    <img style={{width:"10%",hieght:"10%",marginLeft:3}} src={props?.img} alt={props?.id}/>
       <p>{props.id}</p> 
       <p>{sybmol} {currentprice}</p>
<DeleteIcon onClick={deletehandler} />
</Fontco>
    </Container>
  )
}

export default WatchItem
