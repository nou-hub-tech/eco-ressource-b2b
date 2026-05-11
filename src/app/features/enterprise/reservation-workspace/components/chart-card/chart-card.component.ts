import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent {
  private readonly defaultAnimations: NonNullable<ApexChart['animations']> = {
    enabled: true,
    speed: 900,
    animateGradually: {
      enabled: true,
      delay: 120
    },
    dynamicAnimation: {
      enabled: true,
      speed: 420
    }
  };

  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries = [];
  @Input() chart: ApexChart = {
    type: 'line',
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: false }
  };
  @Input() stroke: ApexStroke = { curve: 'smooth', width: 3 };
  @Input() fill: ApexFill = { type: 'gradient' };
  @Input() dataLabels: ApexDataLabels = { enabled: false };
  @Input() xaxis?: ApexXAxis;
  @Input() yaxis?: ApexYAxis | ApexYAxis[];
  @Input() colors: string[] = ['#0284c7'];
  @Input() grid: ApexGrid = {
    borderColor: 'rgba(148, 163, 184, 0.18)',
    strokeDashArray: 3
  };
  @Input() tooltip: ApexTooltip = { theme: 'light' };
  @Input() legend: ApexLegend = { show: false };
  @Input() labels?: string[];
  @Input() responsive?: ApexResponsive[];
  @Input() plotOptions?: ApexPlotOptions;
  @Output() pointSelected = new EventEmitter<{
    seriesIndex: number;
    dataPointIndex: number;
    label: string;
    value: number | null;
  }>();

  get resolvedChart(): ApexChart {
    const inputChart: ApexChart = this.chart ?? ({} as ApexChart);
    const inputEvents = inputChart.events ?? {};
    return {
      ...inputChart,
      type: inputChart.type ?? 'line',
      toolbar: {
        show: false,
        ...(inputChart.toolbar ?? {})
      },
      zoom: {
        enabled: false,
        ...(inputChart.zoom ?? {})
      },
      sparkline: {
        enabled: false,
        ...(inputChart.sparkline ?? {})
      },
      events: {
        ...inputEvents,
        dataPointSelection: (event, chart, options) => {
          inputEvents.dataPointSelection?.(event, chart, options);
          this.emitPointSelection(options);
        }
      },
      animations: inputChart.animations ?? this.defaultAnimations
    };
  }

  private emitPointSelection(options?: {
    seriesIndex?: number;
    dataPointIndex?: number;
  }): void {
    const seriesIndex = options?.seriesIndex ?? -1;
    const dataPointIndex = options?.dataPointIndex ?? -1;
    if (dataPointIndex < 0) {
      return;
    }

    this.pointSelected.emit({
      seriesIndex,
      dataPointIndex,
      label: this.resolvePointLabel(dataPointIndex),
      value: this.resolvePointValue(seriesIndex, dataPointIndex)
    });
  }

  private resolvePointLabel(dataPointIndex: number): string {
    if (Array.isArray(this.labels) && this.labels[dataPointIndex]) {
      return String(this.labels[dataPointIndex]);
    }

    const categories = this.xaxis?.categories;
    if (Array.isArray(categories) && categories[dataPointIndex] !== undefined) {
      return String(categories[dataPointIndex]);
    }

    return '';
  }

  private resolvePointValue(seriesIndex: number, dataPointIndex: number): number | null {
    if (!Array.isArray(this.series) || !this.series.length) {
      return null;
    }

    const firstEntry = this.series[0];
    if (typeof firstEntry === 'number') {
      const value = this.series[dataPointIndex];
      return typeof value === 'number' ? value : null;
    }

    const selectedSeries = this.series[seriesIndex] as
      | { data?: Array<number | { x?: unknown; y?: number | null }> }
      | undefined;
    const point = selectedSeries?.data?.[dataPointIndex];
    if (typeof point === 'number') {
      return point;
    }

    if (point && typeof point === 'object' && 'y' in point && typeof point.y === 'number') {
      return point.y;
    }

    return null;
  }
}
