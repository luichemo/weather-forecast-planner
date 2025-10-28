import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';
import { DailyForecast } from '../../core/models/forecast.model';

Chart.register(...registerables);

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.css']
})
export class ForecastChartComponent implements OnChanges {
  @Input() forecasts: DailyForecast[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | null = null;

  ngOnChanges(): void {
    if (this.forecasts.length > 0) {
      setTimeout(() => this.createChart(), 1000);
    }
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const labels = this.forecasts.map(f => 
      f.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Max Temp (°C)',
            data: this.forecasts.map(f => f.temp_max),
            borderColor: '#ff6b6b',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Min Temp (°C)',
            data: this.forecasts.map(f => f.temp_min),
            borderColor: '#4dabf7',
            backgroundColor: 'rgba(77, 171, 247, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Humidity (%)',
            data: this.forecasts.map(f => f.humidity),
            borderColor: '#51cf66',
            backgroundColor: 'rgba(81, 207, 102, 0.1)',
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Humidity (%)'
            },
            grid: {
              drawOnChartArea: false,
            },
            max: 100
          }
        }
      }
    });
  }
}