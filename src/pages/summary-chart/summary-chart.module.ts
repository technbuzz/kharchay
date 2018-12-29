import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryChartPage } from './summary-chart';


import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SummaryChartPage
    
  ],
  imports: [
    IonicPageModule.forChild(SummaryChartPage),
    CommonModule,
    ComponentsModule
  ]
})
export class SummaryChartPageModule {}
