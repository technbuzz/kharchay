import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { SettingsProvider } from '../../providers/settings/settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
  providers: [
    SettingsProvider
  ]
})
export class SettingsPageModule {}
