import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrentWeather } from '../../core/models/weather.model';
import { WeatherIconComponent } from '../../shared/components/weather-icon/weather-icon.component';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    WeatherIconComponent,
    TemperaturePipe
  ],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent {
  @Input() weather: CurrentWeather | null = null;
}