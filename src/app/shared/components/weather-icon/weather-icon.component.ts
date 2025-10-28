import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIconComponent {
  @Input() icon: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get iconUrl(): string {
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }

  get sizeClass(): string {
    return `icon-${this.size}`;
  }
}