import React from 'react'

import { styled } from '@mui/material/styles';




function PageButton(props) {

   const Button=styled("div")(({theme})=>({
    width:"60%",
    fontSize:"100%",
     marginTop:10,
   fontWeight:"bold",
    height:50,
    color:"white",
    [theme.breakpoints.down("xl")] :{
        width:"130%",
        height:30,
        fontSize: "120%",
        marginTop:5,
       
    }
   }))
  return (
    <Button>
    <button style={{width:"90%",height:"80%",backgroundColor:"gold",borderRadius:5,}}  onClick={props.onClick}>
      {props.value}
    </button>
    </Button>
  )
}

export default PageButton
