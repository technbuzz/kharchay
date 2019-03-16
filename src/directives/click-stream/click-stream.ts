import { Directive } from '@angular/core';
import { Header, NavController } from 'ionic-angular';
import { Observable, Subscription, Scheduler } from 'rxjs';
import { throttleTime, buffer, map, filter } from 'rxjs/operators';

@Directive({
  selector: '[click-stream]' // Attribute selector
})
export class ClickStreamDirective {

  subscriptions = new Subscription();

  constructor(private el: Header, private navCtrl: NavController) {
    const secretElement = this.el.getElementRef().nativeElement;

    const clickStream = Observable.fromEvent(secretElement, 'click');
    this.subscriptions.add(clickStream
    .pipe(
      buffer(clickStream.pipe(throttleTime(600, Scheduler.async, {leading: false, trailing: true}))),
      map(arr => arr.length),
      filter(len => len === 4)
      )
    .subscribe(resp => {
      console.log('clicked', resp);
      this.navCtrl.push('SettingsPage')
    }))
  }

}
