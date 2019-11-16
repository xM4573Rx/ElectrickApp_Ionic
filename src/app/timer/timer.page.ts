import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  users = 'users/+573016683176/';

  onDate: any = '';
  offDate: any = '';
  Aenergy = 0;
  Denergy = 0;
  progress = 0;
  state: boolean;
  refe = firebase.database().ref(this.users);

  constructor() {
    this.refe.on('value', snap => {
      this.Aenergy = snap.child('All').val().Energy;
      this.Denergy = snap.child('Device').val().Energy;
      this.progress = (this.Denergy / this.Aenergy);
      this.state = snap.child('Device').val().State;
      this.offDate = snap.child('Device').val().Off;
      this.onDate = snap.child('Device').val().On;
    });
  }

  ngOnInit() { }

  addItem(item1, item2) {
    if (item1 !== undefined && item1 != null && item2 !== undefined && item2 != null) {
      this.refe.child('Device').child('Off').set(item1);
      this.refe.child('Device').child('On').set(item2);
    }
  }

  change() {
    this.refe.child('Device').child('State').set(this.state);
  }
}
