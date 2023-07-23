import React, { useEffect, useState } from 'react';
import "./style.css";
import Widget from './Widget';

const Temp = () => {

    const [searchItem, setSearchItem] = useState("Khulna");
    const [temparature, setTemp] = useState({});
const getWeatherInfo = async() => {


  try {
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&units=metric&appid=5f9263a7baf1238d0c3c7465a4546273
    `);
    const data = await url.json();
    const {temp,pressure,humidity} = data.main;
    const {main: weathermood} = data.weather[0];
    const {country,sunset} = data.sys;
    const {name} = data;
    const {speed} = data.wind;
    const mynewWeather = {
      temp,
      pressure,
      humidity,
      weathermood,
      country,
      sunset,
      name,
      speed
    }
    setTemp(mynewWeather);
    
  } catch (error) {
    console.log(error)
    
  }

}
useEffect(()=>{
  getWeatherInfo();
},[]);
  return (
    <>
      <div className="wrap">
       <div className="search">
       <input type="search" placeholder="search..." autoFocus 
        id="search"
        className="searchTerm" value={searchItem} onChange={(e) => setSearchItem(e.target.value)}
        />
        <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
       </div>
      </div>

      {/* our temp card */}

      <Widget  temparature={temparature}/>
     
    </>
  )
}

export default Temp;
