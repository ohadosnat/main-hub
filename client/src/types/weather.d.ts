export interface WeatherObject {
  main: string;
  description: string;
  icon: string;
}

export interface WeatherDaily {
  dt: number;
  temp: { min: number; max: number };
  weather: WeatherObject[];
}

export interface IWeather {
  dt: number;
  temp: number;
  weather: WeatherObject[];
}

export interface IWeatherAPI {
  current: IWeather;
  hourly: IWeather[];
  daily: WeatherDaily[];
}
