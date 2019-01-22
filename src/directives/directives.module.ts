import { NgModule } from '@angular/core';
import { StepperDirective } from './stepper/stepper';
import { ClickStreamDirective } from './click-stream/click-stream';
@NgModule({
	declarations: [StepperDirective,
    ClickStreamDirective],
	imports: [],
	exports: [StepperDirective,
    ClickStreamDirective]
})
export class DirectivesModule {}
