import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  users = 'users/+573016683176/';

  onDate: any = '';
  offDate: any = '';
  TimeOnOff: any = '';
  TTimeOnOff = '';
  state: boolean;

  refe = firebase.database().ref(this.users);

  constructor(public navCtrl: NavController) {
    this.refe.on('value', snap => {
      this.state = snap.child('Device').val().State;
      this.offDate = snap.child('Device').val().Off;
      this.onDate = snap.child('Device').val().On;

      if (this.state === true) {
        this.TimeOnOff = this.offDate;
        this.TTimeOnOff = 'Off';
      } else {
        this.TimeOnOff = this.onDate;
        this.TTimeOnOff = 'On';
      }
    });
  }

  ngOnInit() { }

  openTimerPage() {
    this.navCtrl.navigateForward('/timer');
  }

  change() {
    this.refe.child('Device').child('State').set(this.state);
  }
}
