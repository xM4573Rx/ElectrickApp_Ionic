import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {

  path = 'Groups/';

  valor: string;
  name: any;
  group: any;
  concat: any;
  device: any;

  i: any = 0;

  refe = firebase.database().ref(this.path);

  constructor(
    public router: Router,
    public nativeStorage: NativeStorage
  ) {
    this.nativeStorage.getItem('Name')
    .then(
      data => this.name = data,
      error => console.error('Error getting item', error)
    );

    this.nativeStorage.getItem('GROUP')
    .then(
      data => this.group = data,
      error => console.error('Error getting item', error)
    );

    this.nativeStorage.getItem('I')
    .then(
      data => this.i = data,
      error => console.error('Error getting item', error)
    );

    this.concat = this.group + '_' + this.name;
  }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.name = snap.child('Name').val();
      this.group = snap.child('Group').val();

      this.nativeStorage.setItem('Name', this.name)
      .then(
        () => console.error('Stored'),
        error => console.error('Error storing item', error)
      );

      this.nativeStorage.setItem('GROUP', this.group)
      .then(
        () => console.error('Stored'),
        error => console.error('Error storing item', error)
      );

      this.concat = this.group + '/' + this.name;

      this.refe.child('Name').remove();
      this.refe.child('Email').remove();
      this.refe.child('Group').remove();
    });
  }

  openHomePage() {
    this.i = this.i + 1;
    this.device = 'Device' + this.i;
    this.refe.child(this.concat).child(this.device).child('name').set(this.valor);
    this.nativeStorage.setItem('I', this.i)
    .then(
      () => console.error('Stored'),
      error => console.error('Error storing item', error)
    );
    this.router.navigate(['/tabs/tabs']);
  }
}
