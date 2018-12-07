import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

/**
 * Generated class for the StepperDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[stepper]' // Attribute selector
})
export class StepperDirective {

  @HostListener('touchstart',['$event'])
  @HostListener('touchend',['$event'])
  handle(event){
    console.log(event);
    
  }

  constructor(private el:ElementRef, private renderer: Renderer2) {
    console.log('Hello StepperDirective Directive');
    console.log(el.nativeElement);
    
  }



}
