//  interface WeatherObject {
//   main: string;
//   description: string;
//   icon: string;
// }

//  interface WeatherDaily {
//   dt: number;
//   temp: { min: number; max: number };
//   weather: WeatherObject[];
// }

//  interface IWeather {
//   dt: number;
//   temp: number;
//   weather: WeatherObject[];
// }

//  interface IWeatherAPI {
//   current: IWeather;
//   hourly: IWeather[];
//   daily: WeatherDaily[];
// }

declare namespace Weather {
  /** Response from route /api/location */
  interface LocationCoordsResponse {
    message: string;
    data: Coord;
  }

  /** Response Object from `api/weather/forecast` route
   * @param message - response message
   * @param data - response object, contains data about the location.
   */
  interface OneCallResponse {
    message: string;
    data: OneCallDataResponse;
  }

  /** Response Object from `OpenWeather API` OneCall route
   * @see https://openweathermap.org/api/one-call-api
   */
  interface OneCallDataResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: ForecastObject;
    hourly: ForecastObject[];
    daily: DailyForecast[];
  }

  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  /** Standard Weather Object from `OpenWeather API` */
  interface ForecastObject {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop?: number;
  }

  /** Daily Forecast Object from `OpenWeather API` */
  interface DailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
  }

  interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }

  interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }

  interface Coord {
    lon: number;
    lat: number;
  }

  interface HourlyForecastItem {
    type: "hourly";
    payload: Weather.ForecastObject;
  }

  interface DailyForecastItem {
    type: "daily";
    payload: Weather.DailyForecast;
  }

  interface WeatherLocalSave {
    time: number;
    save: Weather.OneCallDataResponse;
  }
}
