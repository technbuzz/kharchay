import { Component, OnInit } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

  dynamicPricing: boolean = true;

  constructor(private settingsProvider: SettingsProvider, private events: Events) {
  }
  
  ngOnInit(){
    this.settingsProvider.getConfig().subscribe(resp => {
      this.dynamicPricing = resp;
    })
  }

  updateTextMode(event){
    this.settingsProvider.inputBS.next(this.dynamicPricing);

    this.events.publish('dynamic:Pricing', this.dynamicPricing);
    // update localstorage
    this.settingsProvider.setConfig({dynamicPricing: this.dynamicPricing});

  }

}
