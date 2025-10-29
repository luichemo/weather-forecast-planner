import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { WeatherService } from './core/services/weather.service';
import { CurrentWeather } from './core/models/weather.model';
import { DailyForecast } from './core/models/forecast.model';

import { SearchComponent } from './features/search/search.component';
import { CurrentWeatherComponent } from './features/current-weather/current-weather.component';
import { ForecastListComponent } from './features/forecast-list/forecast-list.component';
import { ForecastChartComponent } from './features/forecast-chart/forecast-chart.component';
import { HourlyForecastComponent } from './features/hourly-forecast/hourly-forecast.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ForecastCompactComponent } from './features/forecast-compact/forecast-compact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    SearchComponent,
    CurrentWeatherComponent,
    ForecastListComponent,
    ForecastCompactComponent,
    ForecastChartComponent,
    HourlyForecastComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  @ViewChild('hourlySection') hourlySection!: ElementRef;

  currentWeather: CurrentWeather | null = null;
  dailyForecasts: DailyForecast[] = [];
  selectedDay: DailyForecast | null = null;
  isLoading = false;
  hasError = false;

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchCity('London');
  }

  searchCity(city: string): void {
    this.isLoading = true;
    this.hasError = false;
    this.selectedDay = null;

    this.weatherService.getCurrentWeather(city).subscribe({
      next: (weather) => {
        this.currentWeather = weather;
      },
      error: (error) => {
        this.handleError('Unable to fetch current weather');
        this.isLoading = false;
      }
    });

    this.weatherService.getDailyForecast(city).subscribe({
      next: (forecasts) => {
        this.dailyForecasts = forecasts;
        this.isLoading = false;
        this.showSuccess(`Weather data loaded for ${city}`);
      },
      error: (error) => {
        this.handleError('Unable to fetch forecast data');
        this.isLoading = false;
      }
    });
  }

  onDaySelected(day: DailyForecast): void {
    this.selectedDay = day;
    
    // Scroll to hourly forecast section with smooth animation
    setTimeout(() => {
      if (this.hourlySection) {
        this.hourlySection.nativeElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private handleError(message: string): void {
    this.hasError = true;
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}