import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
// import { snapshotToArray } from '../../environments/environment';
import { TimerPage } from '../timer/timer.page';
import { utils } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users = 'users/+573016683176/';
  path = 'Groups/';
  path3 = 'StandBy/';

  items = '';
  Aenergy = '';
  onDate: any = '';
  offDate: any = '';
  Apower = '';
  Denergy = '';
  Cenergy = 0.0;
  Cdevice = 0.0;
  Tcenergy = '';
  Tcdevice = '';
  progress = 0.0;
  inputText = '';
  state: boolean;

  names: Array<any> = [];

  refe = firebase.database().ref(this.path);
  refe2 = firebase.database().ref(this.users);
  refe3 = firebase.database().ref(this.path3);

  constructor(
    public navCtrl: NavController
    ) {
    this.refe.on('child_changed', snap => {
      // console.log(snap.ref.toString() + '/' + snap.val() + '/'); Hasta device con ref y child_changed
      // console.log(snap.val()); Entrega el paquete de hijos con child_changed
    });

    // this.refe.orderByKey().once('child_added').then(snap => {
    //   snap.forEach(snap2 => {
    //     if (snap2.val().name !== undefined) {
    //       this.names.push(snap2.val().name);
    //       console.log(this.names);
    //     }
    //   });
    // });

    // this.refe.orderByKey().on('child_added', snap => {
    //   snap.forEach(snap2 => {
    //     if (snap2.val() !== undefined) {
    //       this.names.push(snap2.val());
    //       console.log(this.names);
    //     }
    //   });
    // });

    this.refe.orderByKey().on('child_changed', snap => {
      snap.forEach(snap2 => {
        if (snap2.val() !== undefined) {
          this.names.push(snap2.val());
          console.log(this.names);
        }
      });
    });

    this.refe2.on('value', snap => {
      this.Aenergy = snap.child('All').val().Energy + ' kWh';
      this.Apower = snap.child('All').val().Power + ' kWh';
      this.Denergy = snap.child('Device').val().Energy;
      this.Cenergy = (parseFloat(this.Aenergy) * 422.3);
      this.Cdevice = (parseFloat(this.Denergy) * 422.3);
      this.Tcenergy = this.Cenergy.toFixed(2).toString() + ' $';
      this.Tcdevice = this.Cdevice.toFixed(2).toString() + ' $ ' + '(' + this.Denergy + ' kWh)';
      this.state = snap.child('Device').val().State;
      this.offDate = snap.child('Device').val().Off;
      this.onDate = snap.child('Device').val().On;

      this.progress = (parseFloat(this.Denergy) / parseFloat(this.Aenergy));
    });
  }
}
