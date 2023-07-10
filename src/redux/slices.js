/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${payload}&units=metric&appid=${apiKey}`;
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending
      .addCase(fetchWeather.pending, (state, action) => {
        state.loading = true;
        state.error = null; // Reset the error state
      })

      //fulfilled
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherData = action?.payload; //action && action.payload
        state.loading = false;
        state.error = undefined;
      })

      //rejected
      .addCase(fetchWeather.rejected, (state, action) => {
        // state.weatherData = undefined;
        state.loading = false;
        state.error = action?.payload; //action && action.payload
      });
  },

  // //pending
  // [fetchWeather.pending]: (state) => {
  //   state.loading = true;
  //   state.error = null;
  // },
  // //fulfilled
  // [fetchWeather.fulfilled]: (state, action) => {
  //   state.weatherData = action.payload;
  //   state.loading = false;
  //   state.error = undefined;
  // },
  // //rejected
  // [fetchWeather.rejected]: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },
  //  (builder) => {
  //   //pending
  //   builder.addCase(fetchWeather.pending, (state, action) => {
  //     state.loading = true;
  //     state.error = null; // Reset the error state
  //   });

  //   //fulfilled
  //   builder.addCase(fetchWeather.fulfilled, (state, action) => {
  //     state.weatherData = action?.payload; //action && action.payload
  //     state.loading = false;
  //     state.error = undefined;
  //   });

  //   //rejected
  //   builder.addCase(fetchWeather.rejected, (state, action) => {
  //     // state.weatherData = undefined;
  //     state.loading = false;
  //     state.error = action?.payload; //action && action.payload
  //   });
  // },
});

export default weatherSlice.reducer;
