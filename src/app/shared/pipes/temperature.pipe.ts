import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit: 'C' | 'F' = 'C'): string {
    if (unit === 'F') {
      value = (value * 9/5) + 32;
    }
    return `${Math.round(value)}°${unit}`;
  }
}