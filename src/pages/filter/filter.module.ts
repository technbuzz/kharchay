import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPage } from './filter';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FilterPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FilterPage),
  ],
})
export class FilterPageModule {}
