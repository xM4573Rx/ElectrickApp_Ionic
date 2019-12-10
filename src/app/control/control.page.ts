import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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

  constructor(
    public router: Router,
    public nativeStorage: NativeStorage
    ) {
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

  ngOnInit() {
    this.refe.child('Name').remove();
    this.refe.child('Email').remove();
    this.refe.child('Group').remove();
  }

  openTimerPage() {
    this.router.navigate(['/timer']);
  }

  openListPage() {
    this.nativeStorage.getItem('Email')
    .then(
      data => this.refe.child('Email').set(data),
      error => console.error('Error getting item', error)
    );

    this.nativeStorage.getItem('Name')
    .then(
      data => this.refe.child('Name').set(data),
      error => console.error('Error getting item', error)
    );

    this.nativeStorage.getItem('GROUP')
    .then(
      data => this.refe.child('Group').set(data),
      error => console.error('Error getting item', error)
    );

    this.router.navigate(['/list']);
  }

  change() {
    this.refe.child('Device').child('State').set(this.state);
  }
}
