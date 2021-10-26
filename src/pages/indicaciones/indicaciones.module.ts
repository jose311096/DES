import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndicacionesPage } from './indicaciones';

@NgModule({
  declarations: [
    IndicacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(IndicacionesPage),
  ],
})
export class IndicacionesPageModule {}
