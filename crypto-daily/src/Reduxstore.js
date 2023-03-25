import {createSlice} from "@reduxjs/toolkit"
import {configureStore} from "@reduxjs/toolkit"
import { useEffect } from "react"
import { doc } from "firebase/firestore"
import { db } from "./firebase"
const cryptodata={check:"",currency:"INR",symbol:"₹",userdata:{img:null,username:null,userUid:null},islogin:false,watchlist:[],alert:{open: false,message: "",type: "success",
 itemAdded:1 }}

const cryptoreducer=createSlice({
    name:"crypto",
    initialState:cryptodata,
    reducers:{
        cuurencyChange(state,action){
            if(action.payload==="USD"){
                state.currency="USD"
                state.symbol="$"
            }else{
                state.currency="INR"
                state.symbol="₹"
            }
            console.log(state.currency)
        },
        LoginHandler(state,action){
            // console.log(action.payload)
            state.userdata.img=action.payload.img
            state.userdata.username=action.payload.username
            state.userdata.userUid=action.payload.userUid
            if(action.payload.login){
                state.islogin=true
            }
      
            // state.userdata.push(action.payload)
        },
        SetAlert(state,action){
            state.alert.open=action.payload.open
            state.alert.message=action.payload.message
            state.alert.type=action.payload.type
        },
        Setwatchlist(state,action){
            // console.log(action.payload)
            console.log("Hi")
            // console.log(action.payload.msg)
            // state.userdata.watchlist=action.payload
        },
        itemadded(state,action){
            state.itemAdded++
        }
    }
})

const store=configureStore({
    reducer:{
     crpyto: cryptoreducer.reducer
}
})


// useEffect(()=>{

   
// },[])

export const cryptoactions=cryptoreducer.actions

export default store