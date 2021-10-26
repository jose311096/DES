import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SolicitarAutoridadPage } from '../pages/solicitar-autoridad/solicitar-autoridad';
import { OpcionesYMasPage } from '../pages/opciones-ymas/opciones-ymas';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { IndicacionesPage } from '../pages/indicaciones/indicaciones';
import { ModalPage } from '../pages/modal/modal';
import { ListadoPage } from '../pages/listado/listado';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = UbicacionPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public dbFirebase :FirebaseDbProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


  }
  goToSolicitarAutoridad(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SolicitarAutoridadPage);
  }goToOpcionesYMas(params){
    if (!params) params = {};
    this.navCtrl.setRoot(OpcionesYMasPage);
  }goToIndicaciones(params){
    if (!params) params = {};
    this.navCtrl.setRoot(IndicacionesPage);
  }goToUbicacion(params){
    if (!params) params = {};
    this.navCtrl.setRoot(UbicacionPage);
  }goToListado(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ListadoPage);
  }
}
