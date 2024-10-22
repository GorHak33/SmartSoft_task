import { configureStore } from "@reduxjs/toolkit";
import forecastWeatherSlice from "./forecastWeatherSlice/forecastWeatherSlice";
const store = configureStore({
  reducer: {
    forecastWeather: forecastWeatherSlice,
  },
});

export default store;
