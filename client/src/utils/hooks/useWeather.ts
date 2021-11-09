// React
import { useEffect } from "react";
// Redux
import { selectUser } from "../../redux/store";
import { setForecast } from "../../redux/weather";
import { useDispatch, useSelector } from "react-redux";
// Utils & Components
import {
  generateTimestamp,
  getLocationCoordsHandle,
  setForecastHandle,
} from "../weather";

/**
 * Hook used for the App's Weather API - handles requests and setting states.
 */
export const useWeather = () => {
  // States
  const { weather } = useSelector(selectUser);
  const { locationByCoords, locationByName } = weather;
  const dispatch = useDispatch();

  // Location Name
  useEffect(() => {
    if (!locationByName || locationByCoords.length === 0) return;
    else getLocationCoordsHandle(locationByName);
  }, [locationByName]);

  // Coords & Data Handling
  useEffect(() => {
    if (locationByCoords.length === 0) return;
    const [lat, lon] = locationByCoords;

    const forecastSave = localStorage.getItem("save"); // Local Storage
    if (forecastSave) {
      const data: Weather.WeatherLocalSave = JSON.parse(forecastSave);

      // checks if the coords are the same. if they're not the same, it means the save is not relevant
      if (data.save.lat !== lat && data.save.lon !== lon)
        setForecastHandle(lat, lon);
      else {
        const currentTime = generateTimestamp();
        currentTime - data.time < 18000
          ? dispatch(setForecast(data.save))
          : setForecastHandle(lat, lon);
      }
    } else {
      setForecastHandle(lat, lon);
    }
  }, [locationByCoords]);
};
