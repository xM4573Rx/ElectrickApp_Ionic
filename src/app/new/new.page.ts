import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  groups = 'StandBy/';

  valor: string;
  user: any = {};
  email: any;
  name: any;

  refe = firebase.database().ref(this.groups);

  constructor(
    public router: Router,
    private http: HttpClient,
    public nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.email = snap.child('Email').val();
      this.name = snap.child('Name').val();

      this.nativeStorage.setItem('Email', this.email)
      .then(
        () => console.error('Stored'),
        error => console.error('Error storing item', error)
      );

      this.nativeStorage.setItem('Name', this.name)
      .then(
        () => console.error('Stored'),
        error => console.error('Error storing item', error)
      );

      this.refe.child('Name').remove();
      this.refe.child('Email').remove();
    });
  }

  openGroupsTwoPage() {
    this.nativeStorage.getItem('Email')
    .then(
      data => this.refe.child('Email').set(data),
      error => console.error(error)
    );

    this.nativeStorage.getItem('Name')
    .then(
      data => this.refe.child('Name').set(data),
      error => console.error(error)
    );

    this.nativeStorage.setItem('GROUP', this.valor)
    .then(
      () => console.error('Stored'),
      error => console.error('Error storing item', error)
    );

    this.refe.child('Group').set(this.valor);
    this.router.navigate(['/groups-two']);
  }
}
