import React from 'react'
import laptop from "../Imgs/laptop.png"
// import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
function Loginimg() {
    const Container = styled('div')(({ theme }) => ({
        width: '55%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        marginTop:50,
        marginLeft:50,
         padding: 20,
        [theme.breakpoints.down('md')]: {
          width: '100%',
          marginTop: 20,
          padding: 20,
          paddingTop: 0,
          marginRight:10,
        },
      }));


  return (
    <Container>

    <img src={laptop} alt="laptopandphoneimg"/>
   
    </Container>
  )
}

export default Loginimg
