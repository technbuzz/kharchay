import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { PieComponent } from './pie/pie';
import { ExpenseImageComponent } from './expense-image/expense-image';
import { IonicModule } from 'ionic-angular';
import { ExpenseItemComponent } from './expense-item/expense-item';


@NgModule({
	declarations: [PieComponent,
    ExpenseImageComponent,
    ExpenseItemComponent],
	imports: [ChartsModule,  IonicModule],
	exports: [PieComponent,
    ExpenseImageComponent,
    ExpenseItemComponent],
	entryComponents: [PieComponent]
})
export class ComponentsModule {}
