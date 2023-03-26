import React,{useState,useEffect, Fragment} from 'react'
import { CoinList } from './Api'
import axios from "axios"
import { useSelector } from 'react-redux'
import { createTheme,ThemeProvider } from '@mui/system'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead  from '@mui/material/TableContainer';
import PageButton from './PageButton'
import "./coinlist.css"

import Table from '@mui/material/TableContainer';
import { useHistory } from 'react-router-dom'

import { numberWithCommas } from './banner/Carousel'

function Coinslist() {

    const [coinlist, Setcoinlist] = useState([])
    const [isLoading, SetisLoading] = useState(false)
    const [search,Setsearch]=useState("")
    const [page,Setpage]=useState(1)

        const cryptodata=useSelector((state)=>{ return state.crpyto.currency}) 
    const sybmol=useSelector((state)=>{ return state.crpyto.symbol}) 
    // const tableHeads=["Coin","Price","24h Change","Market Cap"]
    const islogin=useSelector((state)=>{ return state.crpyto.islogin})
    const history=useHistory()

const getCoinslistHandler= async()=>{
SetisLoading(true)
const {data}= await axios.get(CoinList(cryptodata))
console.log(data)
Setcoinlist(data)
SetisLoading(false)
}
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });



// console.log(coinlist);
useEffect(() => {
if(search.length===0){
  getCoinslistHandler()
}

}, [cryptodata,search,page])


const toCoinPageHandler=(id)=>{
history.push(`/coins/${id}`)
console.log(`/coins/${id}`)
console.log(islogin)

}


const searchHandlerInput=(event)=>{
  Setsearch(event.target.value)
  let searchedcoins;
  if(event.target.value.length>=0){
    searchedcoins= coinlist.filter((eachcoin)=>{ return eachcoin.name.toLowerCase().includes(search) })
   Setcoinlist(searchedcoins)
  }
  console.log(searchedcoins)
}

const ListpageHeader=styled("div")(({theme})=>({
  fontFamily:"Montserrat",
  margin:18,
  fontWeight:400,
  fontSize:30,
  [theme.breakpoints.down("xl")]:{
    fontWeight:200,
  fontSize:10,
  }
}))

const ForFont=styled("div")(({theme})=>({

  fontSize:20,
  fontWeight:200,
  [theme.breakpoints.down("md")]:{
    fontSize:20,
    fontWeight:200,
  },
  [theme.breakpoints.down("xl")]:{
    fontSize:10,
    fontWeight:100,
  },

}))

const Pricespace=styled("div")(({theme})=>({
  marginRight:100,
  [theme.breakpoints.down("md")]:{
    marginRight:70,
  },
  [theme.breakpoints.down("xl")]:{
    marginRight:40,
  }

}))
const MPricespace=styled("div")(({theme})=>({
  // marginRight:100,
  [theme.breakpoints.down("md")]:{
    marginRight:70,
  },
  [theme.breakpoints.down("xl")]:{
    marginRight:0,
  }

}))
const Headerfont=styled("div")(({theme})=>({
  fontWeight:700,
  [theme.breakpoints.down("xl")]:{
    fontSize:10,
    fontWeight:600,
  },
  
}))

const Pagination=styled("div")(({theme})=>({

  display:"flex",
  width:"70%",
  marginLeft:"15%",
  [theme.breakpoints.down("md")]:{
 
  },
  [theme.breakpoints.down("xl")]:{
    
  },

}))
  return (
    <ThemeProvider theme={darkTheme}>
 <Container style={{textAlign:"center"}}>
 <ListpageHeader   >CryptoCurrency Prices By Market Cap</ListpageHeader>

<input placeholder='  Search for a CryptoCurrency'  className='searchbar' onChange={searchHandlerInput}/>
<TableContainer >

{
    isLoading?"its loading":
    (
        <Table  >
        <TableHead  style={{backgroundColor:"#EEBC1D",marginTop:"20px",}}>
        <Headerfont>
        <tr  style={{display:'flex',paddingTop: "10px",paddingBottom:"10px",justifyContent:"space-between",height:"60px",alignItems:"center"}}>
        {
            ["  ","Coin","Price","24h Change","Market Cap","  "].map((head)=>(

                <th key={head}  style={{color:"black",fontFamily:"Montserrat",}} align={head==="Coin"?"":"right"}>{head}</th>
            )
)

        }
       
        </tr>
        </Headerfont>
        </TableHead>
      
        <TableHead style={{backgroundColor:"#242424"}}>
        <ForFont>
        {
          coinlist.slice((page-1)*10,(page-1)*10+10).map((tablecoin)=>{
           let Inprofit=tablecoin.price_change_percentage_24h >=0
           return(
            <tr className='eachcoinfullbox'  onClick={()=>toCoinPageHandler(tablecoin.id)} key={tablecoin.name} style={{marginTop:10,display:'flex',justifyContent:'space-between',borderBottom:"1px solid grey" }}>
           <td> </td>
            <td className='eachccoinbox'><img style={{maxHeight:"60",marginTop:10,}} src={tablecoin?.image} alt={tablecoin?.name} />
            <div style={{display:"flex",flexDirection:"column"}} >
            <span style={{textTransform: "uppercase",}}>
            {tablecoin.symbol}
            </span>
            <span style={{color:"gray"}}>{tablecoin.name}</span>
            </div>
            
            </td>
            <Pricespace align='center' style={{marginTop:50,maxWidth:"1rem",marginLeft:0}}>
            {sybmol}{""}
            {numberWithCommas(tablecoin?.current_price.toFixed(2))}
            </Pricespace>
            <td style={{color:Inprofit>0 ? "green" : "red",marginTop:50,maxWidth:"1rem",marginRight:60,}}>
            {Inprofit && "+"}
            {tablecoin?.price_change_percentage_24h?.toFixed(2)}%
            </td>
            <MPricespace align='left' style={{marginTop:50,}}>{sybmol}{" "}{
              numberWithCommas(tablecoin?.market_cap.toString().slice(0,-6)) 
            } 
            </MPricespace>
            <td> </td>
            </tr>
           )
          })
        }
        </ForFont>
        </TableHead>
        </Table>
    )
 
}
</TableContainer>
<Pagination>
{
  coinlist.map((each,index)=>{
    if(index>0 && index<11){
      return ( <PageButton value={index} onClick={()=>{Setpage(index)}}/>)
    }
  
  })
}

</Pagination>
      </Container>
 
    </ThemeProvider>
  )
}

export default Coinslist
