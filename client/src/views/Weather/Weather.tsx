// Redux & Utils
import { useSelector } from "react-redux";
import { selectUser, selectWeather } from "../../redux/store";
import { kelvinToCelcius } from "../../utils/weather";
// Components
import WeatherEmptyState from "./WeatherEmptyState";
import Forecast from "../../components/Forecast/Forecast";

const Weather = () => {
  const { weather } = useSelector(selectUser);
  const { forecast } = useSelector(selectWeather);

  return (
    <div className="h-full w-full flex flex-col md:justify-center lg:flex-row lg:items-center">
      <svg
        className="fill-wave absolute bottom-0 left-0 h-3/6 lg:h-auto lg:w-full overflow-hidden"
        height="200"
        viewBox="0 0 1384 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M-28 36.1495C-28 36.1495 97.386 120.149 692 37.1496C1286.61 -45.8495 1412 36.1495 1412 36.1495V269.761H-28V36.1495Z"
        />
      </svg>

      {!weather.locationByName ? (
        <WeatherEmptyState />
      ) : forecast ? (
        <>
          <div className="my-6 px-6 text-center cursor-default flex flex-col justify-center md:mt-0 lg:my-0 lg:px-0 lg:mr-0 lg:flex-grow">
            <h2 className="mb-1 text-4xl font-bold">
              {weather.locationByName}
            </h2>
            <p className="font-rubik capitalize mb-2">
              {forecast?.current.weather[0].description}
            </p>
            <h1 className="text-8xl my-2">
              {kelvinToCelcius(forecast?.current.temp!)}°c
            </h1>
          </div>
          <Forecast />
        </>
      ) : (
        <p className="text-2xl font-medium">🌎 Loading Forecast... 🌎</p>
      )}
    </div>
  );
};

export default Weather;
