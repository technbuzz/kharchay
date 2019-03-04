import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'pie',
  templateUrl: 'pie.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieComponent {

  @Input('doughnutChartLabels') doughnutChartLabels: string[];
  @Input('doughnutChartData') doughnutChartData: number[];

  @Output()
  chartClicked = new EventEmitter(); 


  public doughnutChartType: string = 'doughnut';
  donutOptions: any = {
    legend: {
      display: true,
      position: 'right',
      labels: {
        // fontColor: 'rgb(255, 99, 132)'
      }
    },
    // onClick: function(e){
    //   console.log('donutOptions', e);
      
    //   const element = this.getElementAtEvent(e);
    //   console.log(element[0]);
    //   const element1 = this.getSegmentsAtEvent(e);
    //   console.log(element1[0]);
      
    // }
  };


  constructor() {
  }

}
