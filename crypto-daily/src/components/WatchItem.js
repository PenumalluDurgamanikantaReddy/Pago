import React from 'react'
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux'
import { numberWithCommas } from './banner/Carousel';
function WatchItem(props) {
    const currentprice=props.current_price

const sybmol=useSelector((state)=>{ return state.crpyto.symbol})
const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
  return (
    <Container style={{display:"flex",marginTop:20,marginRight:15,width:20,paddingBottom:5,paddingTop:5,alignItems:"center",alignContent:"left",borderRadius:"5px",backgroundColor:"black",fontWeight:"400",justifyContent:"space-between",width:"110%"}}>
       <img style={{width:40,hieght:40}} src={props?.img} alt={props?.id}/>
       <p>{props.id}</p> 
       <p>{sybmol} {currentprice}</p>
  
    </Container>
  )
}

export default WatchItem
