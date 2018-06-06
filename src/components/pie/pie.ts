import { Component, Input } from '@angular/core';
@Component({
  selector: 'pie',
  templateUrl: 'pie.html'
})
export class PieComponent {

  @Input('doughnutChartLabels') doughnutChartLabels: string[];
  @Input('doughnutChartData') doughnutChartData: number[];
  public doughnutChartType: string = 'doughnut';
  donutOptions: any = {
    legend: {
      display: true,
      position: 'right',
      labels: {
        // fontColor: 'rgb(255, 99, 132)'
      }
    }
  };


  constructor() {
    console.log('Hello PieComponent Component');
  }

}
