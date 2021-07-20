import { Time } from '@angular/common';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
  @Input() currentTemp: number;
  @ViewChild('tempChart') tempChartElement: ElementRef;
  tempChart: Chart;
  setTemp: number;
  data = {
    datasets: [
      {
        label: 'Current Temperature',
        backgroundColor: '#49B88A',
        borderColor: '#49B88A',
        data: []
      },
      {
        label: 'Set Temperature',
        backgroundColor: '#ab1b00',
        borderColor: '#ab1b00',
        data: []
      }

    ]
  };

  constructor(private elementRef: ElementRef) {
    this.setTemp = this.currentTemp;
  }

  updateDataSet(value: number) {
  }

  updateCurrentTemp(currentTemp: number) {
    this.currentTemp = currentTemp;
  }

  updateSetTemp(setTemp: number){
    this.setTemp = setTemp;
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
              text: 'Temperature (°F)'
            }
          }
        },
        interaction: {
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Current Smoker Temperature',
            font: {
              size: 24
            }
          }
        }
      }
    });
  }

  onRefresh = chart => {
    const now = Date.now();
    chart.data.datasets.forEach(dataset => {

      if(dataset.label === 'Current Temperature'){
        dataset.data.push({
          x: now,
          y: this.currentTemp
        })
      } else{
        dataset.data.push({
          x: now,
          y: this.setTemp
        });
      }
      
    });
  };
}
