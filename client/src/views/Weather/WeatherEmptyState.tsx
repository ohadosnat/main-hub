import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocationName } from "../../redux/user";

const WeatherEmptyState = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLocationName(inputValue));
    console.log("✨sent!"); //FIXME: make a dispatch to add a new location (set the data and then fetch (inside the reducer))
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValue(e.target.value);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center z-[1]">
      <h1 className="text-2xl font-bold font-merriweather">
        Hey, Please enter a location
      </h1>
      <p className="mb-6">
        You can always change your location in the{" "}
        <Link to="/settings" className="font-medium underline">
          Settings
        </Link>
      </p>
      <form
        className="w-full md:w-4/6 lg:w-3/6 px-6 flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0"
        onSubmit={(e) => formHandle(e)}
      >
        <input
          type="text"
          name="city"
          placeholder="Enter Location"
          className="text-black flex-grow font-light rounded-md px-6 py-2 shadow-md text-center md:text-left"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="submit"
          value="🌍 Add"
          className="global-transition cursor-pointer font-light rounded-md text-center py-2 px-5 shadow-md bg-black text-white transform hover:scale-105 ring-white hover:ring-1 focus:ring-2"
        />
      </form>
    </div>
  );
};

export default WeatherEmptyState;
