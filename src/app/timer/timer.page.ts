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

  constructor() {

    if (this.offDate !== undefined && this.offDate != null) {
      this.refe.child('Device').child('Off').push().set({Off: this.offDate});
    }
    console.log(this.offDate);
  }

  ngOnInit() {
    console.log(this.offDate);
  }

  addItem(item) {
    if (item !== undefined && item != null) {
      this.refe.child('All').child('Energy').set(item);
    }
  }
}
