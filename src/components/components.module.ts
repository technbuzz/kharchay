import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { PieComponent } from './pie/pie';

@NgModule({
	declarations: [PieComponent],
	imports: [ChartsModule],
	exports: [PieComponent],
	entryComponents: [PieComponent]
})
export class ComponentsModule {}
