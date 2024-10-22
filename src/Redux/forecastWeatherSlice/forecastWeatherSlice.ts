// forecastWeatherSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

// Base URL for Open Meteo API
const API_URL = "https://api.open-meteo.com/v1/forecast";

// Parameters interface
interface FetchWeatherDataParams {
  latitude: number;
  longitude: number;
  hourly: string;
}

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ latitude, longitude, hourly }: FetchWeatherDataParams) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          latitude,
          longitude,
          hourly,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch weather data");
    }
  }
);

const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

// Default export
export default forecastWeatherSlice.reducer; // Ensure this is the default export
