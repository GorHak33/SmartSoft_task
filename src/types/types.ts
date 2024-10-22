export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export interface RootState {
  forecastWeather: {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
  };
}

export interface DailyTemperature {
  date: string;
  maxTemp: number;
}
