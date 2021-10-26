import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  guardaSitio(sitio){
    sitio.id  = Date.now();
    return this.afDB.database.ref('sitios/'+sitio.id).set(sitio)
  }

  getSitios(){
  return this.afDB.list('sitios/');
  }


}
