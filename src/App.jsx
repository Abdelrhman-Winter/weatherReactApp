/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./redux/slices";
import Search from "./components/Search-Bar/Search";
import WeatherCard from "./components/Weather-Card/WeatherCard";
import Loader from "./components/Loader/Loader";

function App() {
  const [location, setLocation] = useState("Cairo");

  const dispatch = useDispatch();

  //dispatch api
  useEffect(() => {
    dispatch(fetchWeather(location));
  }, [location, dispatch]);

  //select stat from store
  // const state = useSelector((state) => state);
  // const { weatherData } = state;
  const weatherData = useSelector((state) => state.weatherData);

  if (!weatherData) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradientBg bg-cover bg-center bg-no-repeat px-4 lg:px-0">
      <Search />
      <WeatherCard />
    </div>
  );
}

export default App;
