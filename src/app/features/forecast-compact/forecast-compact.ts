import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DailyForecast } from '../../core/models/forecast.model';
import { WeatherIconComponent } from '../../shared/components/weather-icon/weather-icon.component';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
  selector: 'app-forecast-compact',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    WeatherIconComponent,
    TemperaturePipe
  ],
  templateUrl: './forecast-compact.html',
  styleUrls: ['./forecast-compact.css']
})
export class ForecastCompactComponent {
  @Input() forecasts: DailyForecast[] = [];
  @Input() selectedDay: DailyForecast | null = null;
  @Output() selectDay = new EventEmitter<DailyForecast>();

  getDayName(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } 
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  onDayClick(forecast: DailyForecast): void {
    this.selectDay.emit(forecast);
  }

  isSelected(forecast: DailyForecast): boolean {
    return this.selectedDay?.date.toDateString() === forecast.date.toDateString();
  }
}