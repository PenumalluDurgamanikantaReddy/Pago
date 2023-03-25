

import React, { useEffect, useState } from "react";
// import Button from "../components/Common/Button/Button";
// import Footer from "../components/Common/Footer/footer";
// import Header from "../components/Common/Header";
// import TopButton from "../components/Common/TopButton/topButton";
// import Tabs from "../components/Dashboard/Tabs/tabs";
// import { get100Coins } from "../functions/get100Coins";
// import { Link } from "react-router-dom";

function WatchListPage() {

  const watchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").split(",")
    : [];

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    console.log("watchlist was changed");
    console.log(watchlist)
  }, [watchlist]);

  useEffect(() => {
    // getData();
  }, []);

//   const getData = async () => {
//     const response = await get100Coins();
//     var myCoins = response.filter((coins) => watchlist.includes(coins.id));
//     setCoins(myCoins);
//   };

  return (
    <div>
   <h1>hi</h1>
    </div>
  );
}

export default WatchListPage;
