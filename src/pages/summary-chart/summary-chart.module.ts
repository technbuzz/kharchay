import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryChartPage } from './summary-chart';

@NgModule({
  declarations: [
    SummaryChartPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryChartPage),
  ],
})
export class SummaryChartPageModule {}
