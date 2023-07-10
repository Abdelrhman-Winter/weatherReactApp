import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices";

export const store = configureStore({
  reducer: weatherReducer,
});

export default store;
