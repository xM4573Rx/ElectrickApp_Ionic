import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users = 'StandBy/';

  group: string;
  email: any;
  name: any;

  refe = firebase.database().ref(this.users);

  constructor(
    public router: Router,
    public nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.email = snap.child('Email').val();
      this.name = snap.child('Name').val();
      this.group = snap.child('Group').val();

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

      this.nativeStorage.setItem('GROUP', this.group)
      .then(
        () => console.error('Stored'),
        error => console.error('Error storing item', error)
      );

      this.refe.child('Name').remove();
      this.refe.child('Email').remove();
      this.refe.child('Group').remove();
    });
  }

  openNamePage() {
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

    this.router.navigate(['/name']);
  }
}
