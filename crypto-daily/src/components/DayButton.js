import React from 'react'
import { styled } from '@mui/material/styles';
import { width } from '@mui/system';

function DayButton({children,selected,onClick}) {


const SelectButton = styled('div')(({ theme }) => ({
    border: "1px solid gold",
    borderRadius:5,
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:"Montserrat",
    cursor:"pointer",
    background:selected?"gold":"",
    color:selected? "black":"",
    fontWeight:selected?700:500,
    "&:hover":{
        background:"gold",
        color:"black"
    },
    width:"22%"
}))
  return (
    <SelectButton onClick={onClick}>
      {children}
    </SelectButton>
  )
}

export default DayButton
