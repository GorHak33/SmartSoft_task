import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { RootState, DailyTemperature } from "../../types/types";

const DailyWeather: React.FC = () => {
  const {
    data: weatherData,
    loading,
    error,
  } = useSelector((state: RootState) => state.forecastWeather);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (loading) {
    return <p>Loading current weather...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const hourlyTimeArray = weatherData.hourly.time;
  const temperatureArray = weatherData.hourly.temperature_2m;

  const temperaturesByDate: Record<string, number[]> = {};

  const hourlyDetails: Record<string, { time: string; temp: number }[]> = {};

  const datesArray = hourlyTimeArray.map((time: string) =>
    time.substring(0, 10)
  );

  datesArray.forEach((date: string, index: number) => {
    if (!temperaturesByDate[date]) {
      temperaturesByDate[date] = [];
      hourlyDetails[date] = [];
    }
    temperaturesByDate[date].push(temperatureArray[index]);
    hourlyDetails[date].push({
      time: hourlyTimeArray[index],
      temp: temperatureArray[index],
    });
  });

  console.log(temperaturesByDate);

  const uniqueDatesArray = Array.from(new Set(datesArray)).slice(1, 6);

  const highestTemperatures: DailyTemperature[] = uniqueDatesArray.map(date => {
    const tempsForDate = temperaturesByDate[date];
    return {
      date,
      maxTemp: Math.max(...tempsForDate),
    };
  });

  const handleDateClick = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  return (
    <>
      <h2>Next 5 Days Weather</h2>
      <div className={styles.dailyWeather}>
        {highestTemperatures.map(({ date, maxTemp }) => (
          <div key={`${date}-${maxTemp}`} className={styles.hourlyEntry}>
            <div
              onClick={() => handleDateClick(date)}
              className={styles.dateBox}
            >
              <p>{date}</p>
              <p>Temperature: {maxTemp}°C</p>
            </div>
            {selectedDate === date && (
              <div className={styles.weatherDetails}>
                {hourlyDetails[date]
                  .filter((_, index) => index % 3 === 0)
                  .map(({ time, temp }, index) => (
                    <p key={index}>
                      {new Date(time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      - {temp}°C
                    </p>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DailyWeather;
