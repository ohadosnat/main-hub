// React
import { useEffect } from "react";
// Redux
import { selectUser } from "../../redux/store";
import { setForecast } from "../../redux/weather";
import { setLocationCoords } from "../../redux/user";
import { useDispatch, useSelector } from "react-redux";
// Utils & Components
import { getForecast, getLocationCoords } from "../api/weatherRequests";
import { generateTimestamp } from "../weather";

/**
 * Hook used for the App's Weather API - handles requests and setting states.
 * @returns `setForecastHandle` - function that handles the forecast fetching, setting in global state & saving in local storage.
 */
export const useWeather = () => {
  const { weather } = useSelector(selectUser);
  const dispatch = useDispatch();

  /**
   * Handles the forecast fetching, setting in global state & saving in local storage.
   * @param lat - Location's latitude.
   * @param lon - Location's longitude.
   */
  const setForecastHandle = async (lat: number, lon: number): Promise<void> => {
    try {
      const data = await getForecast({ lat, lon });
      const forecastSave: Weather.WeatherLocalSave = {
        save: data,
        time: generateTimestamp(),
      };

      dispatch(setForecast(data)); // sets the global state
      localStorage.setItem("save", JSON.stringify(forecastSave)); // saves the data to localStorage for future use.
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "there was a problem fetching your location's forecast",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Handles the location coordinates fetching and sets the global state (with `Firestore`).
   * @param location - the location's name
   */
  const getLocationCoordsHandle = async (location: string): Promise<void> => {
    try {
      const coords = await getLocationCoords(location);
      dispatch(setLocationCoords(coords));
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "there was a problem setting your location",
        error,
      };
      console.error(errorMessage);
    }
  };

  // Effects

  // Location Name
  useEffect(() => {
    if (!weather.locationByName) return;
    else getLocationCoordsHandle(weather.locationByName);
  }, [weather.locationByName]);

  // Coords & Data Handling
  useEffect(() => {
    if (weather.locationByCoords.length === 0) return;
    const [lat, lon] = weather.locationByCoords;

    const forecastSave = localStorage.getItem("save"); // Local Storage
    if (forecastSave) {
      const data: Weather.WeatherLocalSave = JSON.parse(forecastSave);

      // checks if the coords are the same, if they're not the same, it means the save is not relevant
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
  }, [weather.locationByCoords]);

  return {
    setForecastHandle,
  };
};
