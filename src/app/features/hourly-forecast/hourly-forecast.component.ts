import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DailyForecast, ForecastItem } from '../../core/models/forecast.model';
import { WeatherIconComponent } from '../../shared/components/weather-icon/weather-icon.component';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
    selector: 'app-hourly-forecast',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        WeatherIconComponent,
        TemperaturePipe
    ],
    templateUrl: './hourly-forecast.component.html',
    styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent {
    @Input() selectedDay: DailyForecast | null = null;

    getHourlyData(): ForecastItem[] {
        return this.selectedDay?.hourlyData || [];
    }

    getTime(timestamp: number): string {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    } getDayName(date: Date): string {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        }
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
}