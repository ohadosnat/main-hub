import store from "../redux/store";
import { setLocationCoords } from "../redux/user";
import { setForecast } from "../redux/weather";
import { getForecast, getLocationCoords } from "./api/weatherRequests";
import locationChangeHandle from "./locationChangeHandle";

/**
 * Calculate the average tempature based on `min` and `max`
 * @param min
 * @param max
 * @returns the average tempature `number`
 */
export const calcAvgTemp = (min: number, max: number): number =>
  (min + max) / 2;

/**
 * Gets the hours based on a `timestamp`
 * @param timestamp - unix epoch timestamp `number`
 * @returns the hours in a date, using local time
 * @example
 * const date = 1618317012; // Tuesday, April 13, 2021 12:30:12 PM
 * getHours(1618317012); // 12
 */
export const getHours = (timestamp: number): number =>
  new Date(timestamp * 1000).getHours();

/**
 * Gets the day name based on the given `date` value
 * @param date - unix epoch timestamp `number`
 * @returns the first three letters of the week day in a human readable way (e.g. `Thu`)
 */
export const getDate = (date: number): string =>
  new Date(date * 1000).toDateString().slice(0, 4);

/**
 * Converts the given temperature from `Kelvin` to `Celcius`
 * @param temp - the temperature in `Kelvin`
 * @returns - the temperature in `Celcius`
 */
export const kelvinToCelcius = (temp: number) => Math.floor(temp - 273.15);

/**
 * Generates the current time in `UNIX` Format.
 * @returns current time in `UNIX` Format
 */
export const generateTimestamp = (): number =>
  Math.floor(new Date().getTime() / 1000);

/**
 * Form Handler, prevents page refresh, fires the change handler and resets the input field value.
 * @param e - the `form` event object. used to prevent page refresh.
 * @param values - the useForm values object (e.g., `values: {location: "london"}`)
 */
export const locationFormHandle = async (
  e: React.FormEvent<HTMLFormElement>,
  values: Record<string, string>
): Promise<void> => {
  e.preventDefault();
  locationChangeHandle(values.location);
  values.location = "";
};

/**
 * Handles the forecast fetching, setting in global state & saving in local storage.
 * @param lat - Location's latitude.
 * @param lon - Location's longitude.
 */
export const setForecastHandle = async (
  lat: number,
  lon: number
): Promise<void> => {
  try {
    const data = await getForecast({ lat, lon });
    const forecastSave: Weather.WeatherLocalSave = {
      save: data,
      time: generateTimestamp(),
    };

    store.dispatch(setForecast(data)); // sets the global state
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
export const getLocationCoordsHandle = async (
  location: string
): Promise<void> => {
  try {
    const coords = await getLocationCoords(location);
    store.dispatch(setLocationCoords(coords));
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message: "there was a problem setting your location",
      error,
    };
    console.error(errorMessage);
  }
};
