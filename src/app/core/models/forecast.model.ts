import { Main, Weather, Wind } from "./weather.model";

export interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
  dt_txt: string;
  pop: number;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

export interface DailyForecast {
  date: Date;
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  weather: Weather;
  humidity: number;
  wind_speed: number;
  pop: number;
  hourlyData: ForecastItem[];
}