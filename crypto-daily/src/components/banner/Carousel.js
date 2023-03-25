import React from 'react'
import "./carousel.css"
import axios from 'axios'
import {TrendingCoins} from "../Api"
import { useSelector } from 'react-redux'
import { useState ,useEffect} from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
    const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
    const sybmol=useSelector((state)=>{ return state.crpyto.symbol}) 
    const [trendingCoins,SettrendingCoins]=useState([])

const TrendingHandler= async()=>{
try{
    const {data} =await axios.get(TrendingCoins(cryptodata))
    SettrendingCoins(data)
}
catch{

}

}

// console.log(trendingCoins)
useEffect(()=>{
    TrendingHandler()

},[cryptodata])


 const items=trendingCoins.map((coin)=>{
   let profit= coin.price_change_percentage_24h >=0
return <Link className='carouselitem' style={{display:"flex",texttransform: "uppercase", cursor: "pointer", color: "white"}}  to={`/coins/${coin.id}`}>
<img src={coin?.image} alt={coin?.name} height="60" style={{marginBottom:10}}/>
<span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {sybmol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
</Link>
 })
const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className='carousel'>
    <AliceCarousel    mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} responsive ={ responsive} autoPlay items={items} disableButtonsControls  disableDotsControls/>
 
    </div>
  )
}

export default Carousel
