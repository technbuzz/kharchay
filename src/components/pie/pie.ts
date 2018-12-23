import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'pie',
  templateUrl: 'pie.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  }

}
