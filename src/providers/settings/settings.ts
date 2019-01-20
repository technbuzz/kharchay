import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

interface ISettings {
  dynamicPricing: boolean;
  collapseEntry: boolean;
}

@Injectable()
export class SettingsProvider {

  private key: string = "kharchay-configs";

  inputBS = new BehaviorSubject(false);
  private config: ISettings;

  constructor() {
    console.log('Hello SettingsProvider Provider');
    this.initConfig();
  }

  private initConfig(){
    this.config = JSON.parse(localStorage.getItem(this.key))
    
    if(this.config){
      this.config.dynamicPricing ? this.inputBS.next(this.config.dynamicPricing) : this.inputBS.next(false);
    }
  }

  getConfig(): Observable<boolean>{
    return this.inputBS.asObservable();
  }
  
  setConfig(newConfig){
    this.config = {...this.config, ...newConfig};
    localStorage.setItem(this.key, JSON.stringify(this.config));
  }



}
