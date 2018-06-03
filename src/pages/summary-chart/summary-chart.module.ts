import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryChartPage } from './summary-chart';
import { ChartsModule } from 'ng2-charts';


import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SummaryChartPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryChartPage),
    CommonModule,
    ChartsModule
  ]
})
export class SummaryChartPageModule {}
