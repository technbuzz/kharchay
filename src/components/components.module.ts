import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { PieComponent } from './pie/pie';
import { ExpenseImageComponent } from './expense-image/expense-image';
import { IonicModule } from 'ionic-angular';


@NgModule({
	declarations: [PieComponent,
    ExpenseImageComponent],
	imports: [ChartsModule,  IonicModule],
	exports: [PieComponent,
    ExpenseImageComponent],
	entryComponents: [PieComponent]
})
export class ComponentsModule {}
