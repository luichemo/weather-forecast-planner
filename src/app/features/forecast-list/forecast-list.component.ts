import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DailyForecast } from '../../core/models/forecast.model';
import { WeatherIconComponent } from '../../shared/components/weather-icon/weather-icon.component';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    WeatherIconComponent,
    TemperaturePipe
  ],
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.css']
})
export class ForecastListComponent {
  @Input() forecasts: DailyForecast[] = [];
  @Output() selectDay = new EventEmitter<DailyForecast>();

  getDayName(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  onDayClick(forecast: DailyForecast): void {
    this.selectDay.emit(forecast);
  }
}