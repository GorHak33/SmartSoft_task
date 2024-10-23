import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { RootState } from "../../types/types";

const CurrentHourWeather: React.FC = () => {
  const {
    data: weatherData,
    loading,
    error,
  } = useSelector((state: RootState) => state.forecastWeather);

  if (loading) {
    return <p>Loading current weather...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!weatherData || !weatherData.hourly) {
    return <p>No weather data available.</p>;
  }

  const currentTime = new Date().getHours();
  const currentHourWeather = weatherData.hourly.time
    .map((time: string, index: number) => {
      const hour = new Date(time).getHours();
      if (hour === currentTime) {
        return {
          time,
          temperature: weatherData.hourly.temperature_2m[index],
        };
      }
      return null;
    })
    .filter(weather => weather !== null)[0];
  console.log(currentHourWeather);

  return (
    <div className={styles.mainWeather}>
      <div className={styles.weatherBox}>
        <h1>Current Hour Weather</h1>
        {currentHourWeather ? (
          <div>
            <p>
              Time:{" "}
              {new Date(currentHourWeather.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Temperature: {currentHourWeather.temperature} °C</p>
          </div>
        ) : (
          <p>No weather data for the current hour.</p>
        )}
      </div>
    </div>
  );
};

export default CurrentHourWeather;
