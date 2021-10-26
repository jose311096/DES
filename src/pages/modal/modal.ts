import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

declare var google: any; 
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  coords : any = { lat: 0, lng: 0 }
  description: string = '';
  address:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl : ViewController,private dbFirebase :FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
    this.getAddress(this.coords).then(results=> {
      this.address = results[0]['formatted_address'];
    }, errStatus => {
        // Aquí iría el código para manejar el error
    });

  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }


  guardarSitio(){
    let sitio = {
      lat: this.coords.lat,
      lng: this.coords.lng ,
      description: this.description,
      address: this.address
    }
  
this.dbFirebase.guardaSitio(sitio).then(res=>{
        console.log('Sitio guardado en firebase:');
        this.cerrarModal();
    })
   }

   getAddress(coords):any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': coords} , function (results, status) { // llamado asincronamente
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
}


}
