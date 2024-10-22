import React, { useEffect, useState } from "react";

import styles from "./App.module.css";

import Search from "./components/Search/Search";
import { fetchWeatherData } from "./Redux/forecastWeatherSlice/forecastWeatherSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CurrentHourWeather from "./components/CurrentHourWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";

function App() {
  const [params, setParams] = useState({
    latitude: 52.52,
    longitude: 13.41,
    hourly: "temperature_2m",
  });

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onSearch = (lng: number, ltd: number) => {
    setParams(prevParams => ({
      ...prevParams,
      longitude: lng,
      latitude: ltd,
    }));
  };
  useEffect(() => {
    dispatch(fetchWeatherData(params));
    console.log(params);
  }, [dispatch, params]);

  return (
    <>
      <Search onSearch={onSearch} />
      <div className={styles.container}>
        <CurrentHourWeather />
        <HourlyWeather />
      </div>

      <DailyWeather />
    </>
  );
}

export default App;
