import { Directive } from '@angular/core';

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

  // touchStart = {
  //   x: 0,
  //   y: 0,
  //   time: 0
  // }

  // @HostListener('touchstart',['$event'])
  // @HostListener('touchend',['$event'])
  // handle(event:TouchEvent){
  //   console.log(event);
  //   const touch: Touch = event.touches[0] || event.changedTouches;
  //   if(event.type === 'touchstart'){
  //     this.touchStart.x = touch.pageX
  //   }
  // read more here for manual swiping
  // https://stackoverflow.com/questions/35728451/using-mobile-events-in-angular2
  // }

  // constructor(private el:ElementRef, private renderer: Renderer2) {
    // console.log('Hello StepperDirective Directive');
    // console.log(el.nativeElement);
    
  // }



}
