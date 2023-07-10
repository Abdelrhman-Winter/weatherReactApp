import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { fetchWeather } from "../../redux/slices";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const [location, setLocation] = useState("Cairo");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  //dispatch api
  useEffect(() => {
    dispatch(fetchWeather(location));
  }, [location, dispatch]);

  //select stat from store
  // const state = useSelector((state) => state);
  // const { error } = state;
  const error = useSelector((state) => state.error);

  //deal wwith input
  const handelInput = (e) => {
    setInputValue(e.target.value);
  };

  const handelSubmit = (e) => {
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

  //error message
  useEffect(() => {
    if (error) {
      setErrorMsg(error.message);

      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {errorMsg && (
        <div
          className="mb-4 flex w-full max-w-[45vw] rounded-lg bg-red-100 bg-opacity-70 p-4 text-sm   text-red-700 lg:max-w-[450px]"
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
            <span className="font-medium opacity-100">{`${error?.message}`}</span>
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
    </>
  );
};

export default Search;
