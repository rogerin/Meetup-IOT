import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //items: FirebaseObjectObservable<any>;
  lampada: FirebaseObjectObservable<any>;
  lamp: any;
  log: any;
  logValue: any;


  constructor(public navCtrl: NavController,af: AngularFire) {
    this.log      = af.database.object('/log',      { preserveSnapshot: true });
    this.lampada  = af.database.object('/lampada',  { preserveSnapshot: true });
    this.lampada.subscribe(snapshot => {
      let bool = snapshot.val() ? true : false;
      this.lamp = bool;
    });
  }

  updateLampada(lamp) {
    let ligaDesliga = lamp ? 1 : 0;
    if(typeof lamp === "boolean") this.lampada.set(ligaDesliga);
    if(this.getLog() >= 0) this.log.set(this.getLog() + 1)
  }

  getLog() {
    this.log.subscribe(snapshot => {
        this.logValue = snapshot.val();
    });
    return parseInt(this.logValue);
  }
}
