import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../environments/environment';
import { TimerPage } from '../timer/timer.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: string = 'users/+573016683176/';

  items: string = '';
  Aenergy: string = '';
  Apower: string = '';
  Denergy = [];
  Cenergy: number = 0.0;
  Tcenergy: string = '';
  refe = firebase.database().ref(this.users);
  inputText: string = '';
  offDate: any = '';

  constructor(public navCtrl: NavController) {

    this.refe.on('value', snap => {
      // this.items = snapshotToArray(snap);
      this.Aenergy = snap.child('All').val().Energy + ' kWh';
      this.Apower = snap.child('All').val().Power + ' kWh';
      this.Denergy = snap.child('Device').val().Energy;
      console.log(this.Denergy);
      this.Cenergy = (parseFloat(this.Aenergy) * 422.3);
      this.Tcenergy = this.Cenergy.toFixed(2).toString() + ' $';
      // console.log(variable);
      /*this.users = this.users + variable + '/';
      this.refe = firebase.database().ref(this.users);
      this.refe.on('child_changed', snap2 => {
        const variable2 = snap2.ref;
        console.log(variable2.toString());
      });*/
      // console.log(this.ref);
    });
    console.log(this.offDate);
  }

  openTimerPage(item) {
    this.navCtrl.navigateForward('/timer');
  }

  addItem(item) {
    if (item !== undefined && item != null) {
      this.refe.child('All').child('Energy').push().set(item);
      this.inputText = '';
    }
  }
}
