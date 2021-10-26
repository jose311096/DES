import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-opciones-ymas',
  templateUrl: 'opciones-ymas.html'
})
export class OpcionesYMasPage {

  constructor(public navCtrl: NavController, private iap: InAppBrowser) {}  
  
  abrirfacebook(){
    this.iap.create('https://www.facebook.com/dondeesseguro', '_blank');
  }
  
  abrirtwitter(){
    this.iap.create('https://twitter.com/dondeesseguro', '_blank');
  }

}


