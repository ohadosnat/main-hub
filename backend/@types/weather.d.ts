declare namespace Weather {
  /** Response from route /api/location */
  interface CurrentWeatherResponse {
    message: string;
    data: CurrentWeatherDataResponse;
  }
  /** Data  */
  interface CurrentWeatherDataResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  interface Clouds {
    all: number;
  }

  interface Coord {
    lon: number;
    lat: number;
  }

  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  }

  interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  interface Wind {
    speed: number;
    deg: number;
    gust: number;
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
  interface DailyForecast extends ForecastObject {
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    pop: number;
    rain?: number;
    temp: Temp;
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
}
