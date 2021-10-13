import Forecast from "../../components/Forecast/Forecast";
import { dummyWeather } from "../../mocks/weather-data-mocks"; // FIXME: TEMP DATA - SHOULD BE FROM GLOBAL STATE AND NOT LOCAL!
import { selectUser } from "../../redux/store";
import { useSelector } from "react-redux";
import WeatherEmptyState from "./WeatherEmptyState";

const Weather = () => {
  const { weather } = useSelector(selectUser);

  return (
    <div className="h-full w-full flex flex-col md:justify-center lg:flex-row lg:items-center">
      {!weather.locationByName ? (
        <WeatherEmptyState />
      ) : (
        <>
          <div className="my-6 px-6 font-merriweather text-center cursor-default flex flex-col justify-center md:mt-0 lg:mr-20 lg:my-0 lg:px-0">
            <h3>Israel</h3>
            <h2 className="mb-3 text-4xl font-bold">
              {weather.locationByName}
            </h2>
            <p className="font-rubik capitalize">
              {dummyWeather.current.weather[0].description}
            </p>
            <h1 className="text-8xl my-2">{dummyWeather.current.temp}°c</h1>
          </div>
          <Forecast />
        </>
      )}
    </div>
  );
};

export default Weather;
