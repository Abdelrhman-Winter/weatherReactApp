/* eslint-disable no-unused-vars */
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloud,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Cairo");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handelInput = (e) => {
    setInputValue(e.target.value);
  };

  const handelSubmit = (e) => {
    console.log(inputValue);

    //if input not empty
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    //select the input
    const input = document.querySelector("input");

    //if input is empty
    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    // clear input
    input.value = "";
    e.preventDefault();
  };

  //fetch api
  useEffect(() => {
    setLoding(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setLoding(false);
      })
      .catch((err) => {
        setLoding(false);
        setErrorMsg(err);
      });
  }, [location]);

  //error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);

    // clear timer
    return () => clearTimeout(timer);
  }),
    [errorMsg];

  console.log(data);
  if (!data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gradientBg bg-cover bg-center bg-no-repeat px-4 lg:px-0">
        <div>
          <ImSpinner8 className=" animate-spin text-5xl text-white" />
        </div>
      </div>
    );
  }
  let icon;
  console.log(data.weather[0].description);
  switch (data.weather[0].main) {
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

  const date = new Date();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradientBg bg-cover bg-center bg-no-repeat px-4 lg:px-0">
      {errorMsg && (
        <div
          className="mb-4 flex w-full max-w-[90vw] rounded-lg bg-red-100 bg-opacity-70 p-4 text-sm   text-red-700 lg:max-w-[450px]"
          role="alert"
        >
          <svg
            className="mr-3 inline h-5 w-5 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path>
          </svg>
          <div>
            <span className="font-medium opacity-100">{`${errorMsg.response.data.message}`}</span>
          </div>
        </div>
      )}
      {/* Search form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } mb-8 h-16 w-full max-w-[450px] rounded-full bg-black/30 backdrop-blur-[32px]`}
      >
        <div className="relative flex h-full items-center justify-between p-2">
          <input
            onChange={(e) => handelInput(e)}
            type="text"
            className="h-full flex-1 bg-transparent pl-6 text-[15px] font-light text-white outline-none placeholder:text-white"
            placeholder="Search by city or country"
          />

          <button
            className=" flex h-12 w-20 items-center justify-center rounded-full bg-[#1ab8ed] transition hover:bg-[#15abdd] "
            onClick={(e) => handelSubmit(e)}
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

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
                  {data.name},{data.sys.country}
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
                  {parseInt(data.main.temp)}
                </div>
                {/* celsius icon*/}
                <div className=" text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather descrption */}
              <div className=" text-center capitalize">
                {data.weather[0].description}
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
                    <span className="ml-2"> {data.visibility / 1000} km</span>
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
                      {parseInt(data.main.feels_like)}
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
                    <span className="ml-2"> {data.main.humidity} %</span>
                  </div>
                </div>
                <div className=" flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind<spin className="ml-2">{data.wind.speed}m/s</spin>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
