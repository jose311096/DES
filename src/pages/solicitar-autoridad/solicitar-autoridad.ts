import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-solicitar-autoridad',
  templateUrl: 'solicitar-autoridad.html'
})
export class SolicitarAutoridadPage {

  constructor(public navCtrl: NavController,private callNumber: CallNumber) {
  }
  
  llamar1(){
  this.callNumber.callNumber("911", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar2(){
  this.callNumber.callNumber("3126113257", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar3(){
  this.callNumber.callNumber("0356582970", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar4(){
  this.callNumber.callNumber("3158820108", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar5(){
    this.callNumber.callNumber("0356432140", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  llamar6(){
    this.callNumber.callNumber("0356613720", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar7(){
    this.callNumber.callNumber("0356622780", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar8(){
    this.callNumber.callNumber("0356777223", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  llamar9(){
    this.callNumber.callNumber("0356130220", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
