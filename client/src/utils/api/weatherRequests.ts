import axios, { AxiosResponse } from "axios";

/**
 * Fetches a location's coordinates based on the location's `name`
 * @param location - the location's `name` - `string`
 * @returns an object with `latitude` and `longitude` values.
 */
export const getLocationCoords = async (location: string) => {
  const res: AxiosResponse<Weather.LocationCoordsResponse, any> =
    await axios.post("http://localhost:5000/api/weather/location", {
      location,
    });
  const data = res.data;
  return data.data;
};

/**
 * Fetches the location's full forecast using the given `coordinates`
 * @param coords - coordinates values (`lat`, `lon`)
 * @returns a forecast object with weather information.
 */
export const getForecast = async (coords: Weather.Coord) => {
  const res: AxiosResponse<Weather.OneCallResponse, any> = await axios.post(
    "http://localhost:5000/api/weather/forecast",
    { coords }
  );
  const data = res.data;
  return data.data;
};
