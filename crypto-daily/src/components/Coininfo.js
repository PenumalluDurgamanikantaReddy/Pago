import axios from 'axios'
import React,{useState,useEffect, } from 'react'
import { useSelector } from 'react-redux'
import { HistoricalChart } from './Api'
import { createTheme,ThemeProvider } from '@mui/material'
import { styled } from '@mui/material/styles';
import {Line} from "react-chartjs-2"
import { Chart, CategoryScale } from 'chart.js';
import { chartDays } from './data'

import DayButton from './DayButton'
import { Chart as ChartJS, LinearScale,PointElement,LineElement, Title, Tooltip,Legend,} from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, Title,Legend,Tooltip,CategoryScale);





Chart.register(CategoryScale);
function Coininfo(props) {

  const [graphhistoryddata, Setgraphhistorydata] = useState([]);
  const [days, Setdays] = useState(1)
  const currency=useSelector((state)=>{ return state.crpyto.currency})
  const coinid=props.coin.id

  const fetchgraphData= async()=>{
    console.log(props.coin.id)
    const {data}= await axios.get(HistoricalChart(coinid,days,currency))
    // const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // console.log(data)
    Setgraphhistorydata(data.prices)
  }
useEffect(() => {
  fetchgraphData()
}, [currency,days])

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Container = styled('div')(({ theme }) => ({
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'left',
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));


const labels=graphhistoryddata.map((coin) => {
  let date = new Date(coin[0]);
  let time =
    date.getHours() > 12
      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
      : `${date.getHours()}:${date.getMinutes()} AM`;
  return days === 1 ? time : date.toLocaleDateString();
})

const data = {
  labels,
  datasets: [
    {
      data: graphhistoryddata.map((coin) => coin[1]),
      label: `Price ( Past ${days} Days ) in ${currency}`,
      borderColor: "#EEBC1D",
      // backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const options={
  elements: {
    point: {
      radius: 1,
    },
  },
}


  return (
    <ThemeProvider theme={darkTheme}>
   <Container>

  
  <Line data={data} options={options}/> 
 
<div style={{display:"flex",marginTop:20,justifyContent:"space-around",widows:"100%"}}>
{chartDays.map((each)=>(<DayButton key={each.value} onClick={()=>Setdays(each.value)} selected={each.value===days}>{each.label}</DayButton>))}
</div>


   </Container>
    </ThemeProvider>
  )
}

export default Coininfo;
