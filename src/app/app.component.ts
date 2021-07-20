import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { interval } from 'rxjs';
import { TemperatureChartComponent } from './components/temperature-chart/temperature-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('tempChart') tempChartComponent: TemperatureChartComponent;
  title = 'smoker-controller';
  currentTemp: any;
  currentSetTemp: any;
  tempUrl = 'http://localhost:3000/api/current-temp';
  ;

  constructor(private http: HttpClient){
  }

  

  ngOnInit(): void {
    this.getSetTemp();
    interval(1000).subscribe(() => {
      this.getCurrentTemp();
      this.tempChartComponent.updateCurrentTemp(this.currentTemp);
      this.tempChartComponent.updateSetTemp(this.currentSetTemp);
    });
    
  }

  getCurrentTemp(): void{
    this.http.get(this.tempUrl).subscribe(val => this.currentTemp = val);
  }

  changeSetTemp(setTemp: any): void{
    console.log('changing set temp from client to ' + setTemp);
    this.currentSetTemp = setTemp;
    this.http.post<any>('http://localhost:3000/api/change-set-temp', this.currentSetTemp)
      .subscribe((result) => console.log(result));;
  }

  getSetTemp(): void{
    this.http.get('http://localhost:3000/api/get-set-temp').subscribe(val => {
      this.currentSetTemp = val;
      console.log('received set temp data: ' + this.currentSetTemp);
    });
  }
  
}

