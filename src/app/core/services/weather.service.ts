import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CurrentWeather } from '../models/weather.model';
import { ForecastResponse, DailyForecast, ForecastItem } from '../models/forecast.model';
import { environment } from '../interceptors/api.interceptor';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<CurrentWeather>(`${this.apiUrl}/weather`, { params });
  }

  getForecast(city: string): Observable<ForecastResponse> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<ForecastResponse>(`${this.apiUrl}/forecast`, { params });
  }

  getDailyForecast(city: string): Observable<DailyForecast[]> {
    return this.getForecast(city).pipe(
      map(response => this.processForecastData(response))
    );
  }

  private processForecastData(response: ForecastResponse): DailyForecast[] {
    const dailyMap = new Map<string, ForecastItem[]>();

    response.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      dailyMap.get(date)!.push(item);
    });

    const dailyForecasts: DailyForecast[] = [];
    dailyMap.forEach((items, dateString) => {
      const temps = items.map(i => i.main.temp);
      const date = new Date(dateString);
      
      dailyForecasts.push({
        date: date,
        temp_min: Math.min(...temps),
        temp_max: Math.max(...temps),
        temp_avg: temps.reduce((a, b) => a + b, 0) / temps.length,
        weather: items[0].weather[0],
        humidity: Math.round(items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length),
        wind_speed: Math.round(items.reduce((sum, i) => sum + i.wind.speed, 0) / items.length),
        pop: Math.max(...items.map(i => i.pop)) * 100,
        hourlyData: items
      });
    });

    return dailyForecasts.slice(0, 5); 
  }
}