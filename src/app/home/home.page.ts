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

  items = [];
  ref = firebase.database().ref('users/+573016683176/');
  inputText: string = '';

  constructor(public navCtrl: NavController) {
    this.ref.on('value', resp => {
      this.items = snapshotToArray(resp);
    });
  }

  openTimerPage(item) {
    this.navCtrl.navigateForward('/timer');
  }

  addItem(item) {
    if (item !== undefined && item != null) {
      let newItem = this.ref.push();
      newItem.set(item);
      this.inputText = '';
    }
  }
}
