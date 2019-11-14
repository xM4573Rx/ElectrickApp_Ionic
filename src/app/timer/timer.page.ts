import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  users: string = 'users/+573016683176/';

  onDate: any = '';
  offDate: any = '';
  refe = firebase.database().ref(this.users);

  constructor() { }

  ngOnInit() { }

  addItem(item1, item2) {
    if (item1 !== undefined && item1 != null && item2 !== undefined && item2 != null) {
      this.refe.child('Device').child('Off').set(item1);
      this.refe.child('Device').child('On').set(item2);
    }
  }
}
