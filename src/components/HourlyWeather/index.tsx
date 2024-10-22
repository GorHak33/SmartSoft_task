import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { RootState } from "../../types/types";

interface HourlyWeather {
  time: string;
  temperature: number;
}

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

  const currentTime = new Date();

  const hourlyWeather: HourlyWeather[] = weatherData.hourly.time.map(
    (time: string, index: number) => ({
      time,
      temperature: weatherData.hourly.temperature_2m[index],
    })
  );

  const filteredData = hourlyWeather.filter(entry => {
    const entryTime = new Date(entry.time);
    return entryTime > currentTime && entryTime.getHours() % 3 === 0;
  });

  while (filteredData.length < 8) {
    const nextDayWeather = hourlyWeather.filter(entry => {
      const entryTime = new Date(entry.time);
      return entryTime > currentTime && entryTime.getHours() % 3 === 0;
    });

    if (nextDayWeather.length === 0) break;

    const nextEntry = nextDayWeather.shift();
    if (nextEntry) {
      filteredData.push(nextEntry);
    }
  }

  const displayData = filteredData.slice(0, 8);

  return (
    <div className={styles.mainWeather}>
      <h1>Upcoming Hourly Weather</h1>
      {displayData.length > 0 ? (
        <div className={styles.weatherEntries}>
          {displayData.map((entry, index) => {
            const entryDate = new Date(entry.time).toLocaleDateString();
            return (
              <div key={index} className={styles.weatherEntry}>
                <p>
                  {entryDate} - Time:{" "}
                  {new Date(entry.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Temperature: {entry.temperature} °C</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No upcoming weather data available.</p>
      )}
    </div>
  );
};

export default CurrentHourWeather;
