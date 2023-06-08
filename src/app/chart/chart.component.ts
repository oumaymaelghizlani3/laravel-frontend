import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataset, ChartOptions, ChartType, Scriptable } from 'chart.js';
import { Color } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public barChartOptions = {
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartData: ChartDataset[] = [];

  

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:8000/chart-data').subscribe(data => {
      this.barChartLabels = data.labels;
      this.barChartData = [
        {  data: data.data, label: 'Commandes par année', backgroundColor: 'rgba(0, 123, 255, 0.5)'}
      ];
    });
  }
}



  









