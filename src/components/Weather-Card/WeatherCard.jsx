/* eslint-disable no-unused-vars */
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloud,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeather } from "../../redux/slices";
import { ImSpinner8 } from "react-icons/im";
import { TbTemperatureCelsius } from "react-icons/tb";

const WeatherCard = () => {
  const [location, setLocation] = useState("Cairo");
  const dispatch = useDispatch();

  //dispatch api
  useEffect(() => {
    dispatch(fetchWeather(location));
  }, [location, dispatch]);

  //select stat from store
  // const state = useSelector((state) => state);
  // const { weatherData, loading } = state;

  const weatherData = useSelector((state) => state.weatherData);
  const loading = useSelector((state) => state.loading);

  let icon;
  switch (weatherData?.weather[0]?.main) {
    case "Clouds":
      icon = <IoMdCloud />;
      break;

    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;

    case "Rain":
      icon = <IoMdRainy />;
      break;

    case "Clear":
      icon = <IoMdSunny />;
      break;

    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;

    case "Snow":
      icon = <IoMdSnow />;
      break;

    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  //date ****/**/**
  const date = new Date();

  return (
    <>
      {/* card */}
      <div className=" min-h-[584px] w-full max-w-[450px] rounded-[35px] bg-black/20 px-6 py-12 text-white backdrop-blur-[32px]">
        {loading ? (
          <div className=" flex h-full w-full items-center justify-center">
            <ImSpinner8 className=" animate-spin text-5xl text-white" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className=" flex items-center gap-x-5">
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
                <div className=" text-2xl  font-semibold">
                  {weatherData?.name},{weatherData?.sys?.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className=" my-20">
              <div className=" flex justify-center">
                <div className="text-[144px] font-light leading-none">
                  {parseInt(weatherData?.main?.temp)}
                </div>
                {/* celsius icon*/}
                <div className=" text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather descrption */}
              <div className=" text-center capitalize">
                {weatherData?.weather[0]?.description}
              </div>
            </div>
            {/*card bottom */}
            <div className=" mx-auto flex max-w-[378px] flex-col gap-y-6">
              <div className="flex justify-between ">
                <div className=" flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    visibility{" "}
                    <span className="ml-2">
                      {" "}
                      {weatherData?.visibility / 1000} km
                    </span>
                  </div>
                </div>
                <div className=" flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feel ike
                    <div className="ml-2 flex ">
                      {parseInt(weatherData?.main?.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between ">
                <div className=" flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">
                      {" "}
                      {weatherData?.main?.humidity} %
                    </span>
                  </div>
                </div>
                <div className=" flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind
                    <span className="ml-2">{weatherData?.wind?.speed}m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherCard;
