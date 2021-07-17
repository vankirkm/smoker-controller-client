import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TemplateBindingParseResult } from '@angular/compiler';
import { TemperatureChartComponent } from './components/temperature-chart/temperature-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smoker-controller';
  currentTemp: any;
  currentSetTemp: any;
  tempUrl = 'http://localhost:3000/api/current-temp';
  ;

  constructor(private http: HttpClient,){
  }

  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    interval(1000).subscribe(() => {
      this.getCurrentTemp();
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

