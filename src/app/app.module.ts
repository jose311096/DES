import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SolicitarAutoridadPage } from '../pages/solicitar-autoridad/solicitar-autoridad';
import { OpcionesYMasPage } from '../pages/opciones-ymas/opciones-ymas';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { IndicacionesPage } from '../pages/indicaciones/indicaciones';
import { ListadoPage } from '../pages/listado/listado';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number';
import { Globalization } from '@ionic-native/globalization';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { Vibration } from '@ionic-native/vibration';
import { BackgroundMode } from '@ionic-native/background-mode';

export const firebaseConfig = {
  apiKey: "AIzaSyBUOt0C9FsrHBVptdMFyXGEyPowOyP4I7w",
  authDomain: "reportes-e0f0a.firebaseapp.com",
  databaseURL: "https://reportes-e0f0a.firebaseio.com",
  projectId: "reportes-e0f0a",
  storageBucket: "reportes-e0f0a.appspot.com",
  messagingSenderId: "616443091712"
};

@NgModule({
  declarations: [
    MyApp,
    SolicitarAutoridadPage,
    OpcionesYMasPage,
    IndicacionesPage,
    UbicacionPage,
    ListadoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SolicitarAutoridadPage,
    OpcionesYMasPage,
    IndicacionesPage,
    UbicacionPage,
    ListadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    CallNumber,
    Globalization,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseDbProvider,
    FirebaseDbProvider,
    PhonegapLocalNotification,
    Vibration,
    BackgroundMode
  ]
})
export class AppModule {}