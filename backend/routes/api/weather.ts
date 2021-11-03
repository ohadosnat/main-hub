import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

/** Fetches the current weather for the given location
 * @returns the `lat` and `lon` values of the given location that can be used to fetch additional data about the location (forecast, historical data, and more)
 */
router.post("/location", async (req, res) => {
  const locationName = req.body.location;
  const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${process.env.OPENWEATHER_API_KEY}`;
  try {
    const resp = await axios.get(url);
    const data = resp.data as Weather.CurrentWeatherDataResponse;
    res.status(200).json({
      message: "location fetched!",
      data: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    });
  } catch (error) {
    res.json({
      message: "there was a problem fetching the weather for this location",
      error,
    });
    res.status(400).end();
  }
});

/** This route fetches weather information from `OpenWeather API One Call`
 * @returns an object with the following data:
 *  - Current weather
 *  - Hourly forecast for 48 hours
 *  - Daily forecast for 7 days
 *
 * @see https://openweathermap.org/api/one-call-api
 */
router.post("/forecast", async (req, res) => {
  const { lat, lon } = req.body.coords as Weather.Coord;
  const exclude: string = "minutely, alerts";
  const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${process.env.OPENWEATHER_API_KEY}`;

  try {
    const resp = await axios.get(url);
    const data = resp.data as Weather.OneCallDataResponse;

    const forecastResponse: Weather.OneCallResponse = {
      message: "forecast fetched successfully",
      data,
    };
    res.status(200).json(forecastResponse);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      message: "there was a problem fetching forecast for this location",
      error,
    };
    res.status(400).json(errorResponse);
  }
});

module.exports = router;
