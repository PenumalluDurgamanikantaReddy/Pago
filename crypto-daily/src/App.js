
import './App.css';
import Login from './components/Login';
import {BrowserRouter,Route,} from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home';
import Coinpage from './components/CoinPage';

import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';


function App() {
  const islogin=useSelector((state)=>{ return state.crpyto.islogin})
  const App  = styled('div')({
    backgroundColor: '#14161a',
    color:"white",
    minHeight:"100vh"
  });

// const newstyles=
  return (
  
    <BrowserRouter>
    <div >
    <App >
<Header/>
{!islogin &&
  <Route path="/login" component={Login} exact/>

}


  <Route path="/home" component={Home} />



<Route path="/coins/:coinid" component={Coinpage}/>



<Route path="/" exact>
<Login/>

   </Route>


</App>
    </div>
</BrowserRouter>
   
  );
}

export default App;
// <Route path="/home">