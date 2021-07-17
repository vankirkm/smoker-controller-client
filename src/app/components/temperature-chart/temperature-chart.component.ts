import { Time } from '@angular/common';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables, ChartType } from 'chart.js';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
Chart.register(...registerables, ChartStreaming);
Chart.defaults.set('plugins.streaming', {
  duration: 20000
});

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css']
})

export class TemperatureChartComponent implements OnInit {
  @ViewChild('tempChart') tempChartElement: ElementRef;
  tempChart: Chart;
  data = {
    datasets: [
      {
        label: 'Current Temperature',
        backgroundColor: '#49B88A',
        borderColor: '#49B88A',
        data: []
      }
    ]
  };

  constructor(private elementRef: ElementRef) {
  }

  updateDataSet(value: number) {
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log(this.tempChartElement.nativeElement);
    const myChart = new Chart(this.tempChartElement.nativeElement, {
      type: 'line',
      data: this.data,
      options: {
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 2000,
              onRefresh: this.onRefresh
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        },
        interaction: {
          intersect: false
        }
      }
    });
  }

  onRefresh = chart => {
    const now = Date.now();
    chart.data.datasets.forEach(dataset => {
      dataset.data.push({
        x: now,
        y: (Math.random() * (100 - -100) + -100)
      });
    });
  };
}
