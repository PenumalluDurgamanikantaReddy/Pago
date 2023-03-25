import React,{useState,useEffect, Fragment} from 'react'
import { CoinList } from './Api'
import axios from "axios"
import { useSelector } from 'react-redux'
import { createTheme,ThemeProvider } from '@mui/system'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';
import TableHead  from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import TableBody from '@mui/material/TableBody';
import "./coinlist.css"
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/TableContainer';
import { useHistory } from 'react-router-dom'
import TableCell from '@mui/material/TableCell';
// import Pagination from '@mui/material/Pagination';
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

}, [cryptodata,search])

// const searchHandler=()=>{

// return coinlist.filter((eachcoin)=>{
// return eachcoin.name.toLowerCase().includes(search) || eachcoin.symbol.toLowerCase(search)
       
// })

// }
const toCoinPageHandler=(id)=>{
history.push(`/coins/${id}`)
console.log(`/coins/${id}`)
console.log(islogin)
// path="/coins/:coinid"
// history.push(`/channels/${id}`)
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
  return (
    <ThemeProvider theme={darkTheme}>
 <Container style={{textAlign:"center"}}>
 <h4   style={{fontFamily:"Montserrat", margin:18,fontWeight:400,fontSize:30}}>CryptoCurrency Prices By Market Cap</h4>

<input placeholder='  Search for a CryptoCurrency'  className='searchbar' onChange={searchHandlerInput}/>
<TableContainer >
{
    isLoading?"its loading":
    (
        <Table  >
        <TableHead  style={{backgroundColor:"#EEBC1D",marginTop:"20px",}}>
        <tr  style={{display:'flex',paddingTop: "10px",paddingBottom:"10px",justifyContent:"space-between",height:"60px",alignItems:"center"}}>
        {
            ["  ","Coin","Price","24h Change","Market Cap","  "].map((head)=>(

                <th key={head}  style={{color:"black",fontWeight:700,fontFamily:"Montserrat",}} align={head==="Coin"?"":"right"}>{head}</th>
            )
)

        }
    
        </tr>
        </TableHead>
        <TableHead style={{backgroundColor:"#242424"}}>
        {
          coinlist.slice((page-1)*10,(page-1)*10+10).map((tablecoin)=>{
           let Inprofit=tablecoin.price_change_percentage_24h >=0
           return(
            <tr className='eachcoinfullbox'  onClick={()=>toCoinPageHandler(tablecoin.id)} key={tablecoin.name} style={{marginTop:10,display:'flex',justifyContent:'space-between',borderBottom:"1px solid grey" }}>
           <td> </td>
            <td className='eachccoinbox'><img style={{maxHeight:"60",marginTop:10,}} src={tablecoin?.image} alt={tablecoin?.name} />
            <div style={{display:"flex",flexDirection:"column"}} >
            <span style={{textTransform: "uppercase",fontSize:20}}>
            {tablecoin.symbol}
            </span>
            <span style={{color:"gray"}}>{tablecoin.name}</span>
            </div>
            
            </td>
            <td align='left' style={{marginTop:50,maxWidth:"1rem",marginRight:100,marginLeft:0}}>
            {sybmol}{""}
            {numberWithCommas(tablecoin?.current_price.toFixed(2))}
            </td>
            <td style={{color:Inprofit>0 ? "green" : "red",fontWeight:300,marginTop:50,maxWidth:"1rem",marginRight:60,}}>
            {Inprofit && "+"}
            {tablecoin?.price_change_percentage_24h?.toFixed(2)}%
            </td>
            <td align='right' style={{marginTop:50,marginRight:0}}>{sybmol}{" "}{
              numberWithCommas(tablecoin?.market_cap.toString().slice(0,-6)) 
            } M
            </td>
            <td> </td>
            </tr>
           )
          })
        }
        </TableHead>
        </Table>
    )
 
}
</TableContainer>

      </Container>
    </ThemeProvider>
  )
}

export default Coinslist
