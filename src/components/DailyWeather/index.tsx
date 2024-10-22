import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { WeatherData, RootState, DailyTemperature } from "../../types/types";

const DailyWeather: React.FC = () => {
  const data: WeatherData | null = useSelector(
    (state: RootState) => state.forecastWeather.data
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!data) {
    return <div>No weather data available</div>;
  }

  const { time: hourlyTimeArray, temperature_2m: temperatureArray } =
    data.hourly;

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
