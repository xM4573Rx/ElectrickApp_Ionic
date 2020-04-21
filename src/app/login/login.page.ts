import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  path = 'Jose/';

  energystate: string;
  red: string;

  refe = firebase.database().ref(this.path);

  constructor() { }

  ngOnInit() {
    this.refe.on('value', snap => {
      this.energystate = snap.child('Energia').val();
      this.red = snap.child('Red').val();
    });
  }
}
