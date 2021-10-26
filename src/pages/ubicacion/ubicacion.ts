import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AngularFireList } from 'angularfire2/database';
import { Title } from '@angular/platform-browser/src/browser/title';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { Vibration } from '@ionic-native/vibration';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AlertController } from 'ionic-angular';

declare var google: any;

/**
 * Generated class for the UbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {
  [x: string]: any;

  sitios: any;
  map: any; //manejador del mapa
  coords : any = {lat: 0, lng: 0}
  Distancia: any;

  sitios2:AngularFireList<any>;
  lista:Array<any> = [];
  marcadores:Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation,public modalCtrl : ModalController,public dbFirebase :FirebaseDbProvider,private localNotification: PhonegapLocalNotification,private vibration: Vibration,private backgroundMode: BackgroundMode,public alertCtrl: AlertController) {

    this.backgroundMode.enable();

    platform.ready().then(() => {
      // La plataforma esta lista y ya tenemos acceso a los plugins.
        this.obtenerPosicion();
     });

     this.sitios2 = this.dbFirebase.getSitios()
    this.sitios2.query.ref.on('value', snapshot => {
        snapshot.forEach(snap => {
          console.log(snap.val());
          this.lista.push(snap.val());
        })
    })

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicacionPage');

  }


  loadMap(){
    let mapContainer = document.getElementById('map');
     this.map = new google.maps.Map(mapContainer, {
       center: this.coords,
       zoom: 13
     });

  // Colocamos el marcador
  let miMarker = new google.maps.Marker({
    icon : 'assets/img/MarcadorPropio.png',
    map: this.map,
    position: this.coords,
    title: "Mi ubicacion",
  });
  google.maps.event.addListener(miMarker, 'click', () => {
    this.showAlert("Mi ubicacion");
  });
  

  for(var k =0 ; k < this.lista.length; k++){
  //colocamos los marcadores
  this.marcadores[k] = new google.maps.Marker({
    icon : 'assets/img/MarcadorUsuarios.png',
    map: this.map,
    position: {lat: this.lista[k].lat, lng: this.lista[k].lng},
    title: this.lista[k].description
  });
  }//llave del for

  for(var i =0 ; i < this.lista.length; i++){

    if(this.lista[i].description=="Hurto a personas"){
      google.maps.event.addListener(this.marcadores[i], 'click', () => {
         this.showAlert("Hurto a personas");
       });
    }else{
      if(this.lista[i].description=="Hurto a locales/viviendas"){
        google.maps.event.addListener(this.marcadores[i], 'click', () => {
          this.showAlert("Hurto a locales/viviendas");
        });
      }else{
        if(this.lista[i].description=="Presencia de pandillas"){
          google.maps.event.addListener(this.marcadores[i], 'click', () => {
            this.showAlert("Presencia de pandillas");
          });
        }else{
          if(this.lista[i].description=="Microtrafico de estupefacientes"){
            google.maps.event.addListener(this.marcadores[i], 'click', () => {
              this.showAlert("Microtrafico de estupefacientes");
            });
          }else{
            if(this.lista[i].description=="Homicidio/Intento de homicidio"){
              google.maps.event.addListener(this.marcadores[i], 'click', () => {
                this.showAlert("Homicidio/Intento de homicidio");
              });
            }else{
              if(this.lista[i].description=="Riñas/Altercado"){
                google.maps.event.addListener(this.marcadores[i], 'click', () => {
                  this.showAlert("Riñas/Altercado");
                });
              }
            }
          }
        }
      }
    }
    
  }//llave del for
 

  //verificar proximidad a otros puntos
  for(var j =0 ; j < this.lista.length; j++){
    var lat1 = this.coords.lat;
    var lon1 = this.coords.lng;
    var lat2 = this.lista[j].lat;
    var lon2 = this.lista[j].lng;

    this.Distancia = Dist(lat1, lon1, lat2, lon2);   //Retorna numero en Km

    if(this.Distancia <= 0.2){
      this.localNotification.requestPermission().then(
        (permission) => {
          if (permission === 'granted') {
            // Create the notification
            this.vibration.vibrate([3000,1000,3000]);
            this.localNotification.create('ALERTA', {
              tag: 'notificacion',
              body: 'Usted se encuentra en un radio de 200 metros de una zona insegura',
              icon: 'assets/img/icon.png'
            });
      
          }
        }
      );
    }

  }//llave for

function Dist(lat1, lon1, lat2, lon2)
{
var rad = function(x) {return x*Math.PI/180;}

var R     = 6378.137;                     //Radio de la tierra en km
var dLat  = rad( lat2 - lat1 );
var dLong = rad( lon2 - lon1 );

var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;

return d.toFixed(3);                      //Retorna tres decimales
}
  //verificar proximidad a otros puntos

 }//cargar mapa

  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;

      this.loadMap();
    })
    .catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  nuevositio(){
  // aquí vamos a abrir el modal para añadir nuestro sitio.
  let mimodal = this.modalCtrl.create( 'ModalPage',this.coords );
  mimodal.present();
  this.obtenerPosicion();
  }

  showAlert(_title) {
    const alert = this.alertCtrl.create({
      title: _title,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  actualizar(){
    this.obtenerPosicion();
  }

}
