import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { snapshotChanges } from 'angularfire2/database';

/**
 * Generated class for the ListadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

  sitios:AngularFireList<any>;
  lista:Array<any> = [];
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbFirebase :FirebaseDbProvider) {

    this.sitios = this.dbFirebase.getSitios()
    this.sitios.query.ref.on('value', snapshot => {
        snapshot.forEach(snap => {
          console.log(snap.val());
          this.lista.push(snap.val());
        })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPage');
    
  }


}
