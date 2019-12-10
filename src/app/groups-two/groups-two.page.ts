import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-groups-two',
  templateUrl: './groups-two.page.html',
  styleUrls: ['./groups-two.page.scss'],
})
export class GroupsTwoPage implements OnInit {

  users = 'StandBy/';
  users2 = 'Groups/';

  group: string;
  passed: any;
  email: any;
  name: any;

  refe = firebase.database().ref(this.users);
  refe2 = firebase.database().ref(this.users2);

  concat: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public nativeStorage: NativeStorage
  ) {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/groups-two', true) && this.router.url === '/groups-two') {
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      }
    });
  }

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

      this.concat = this.group + '_' + this.name;
      this.refe2.child(this.concat).set('Grupo creado');

      this.refe.child('Name').remove();
      this.refe.child('Email').remove();
      this.refe.child('Group').remove();
    });
  }

  openTabsPage() {
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

    this.navCtrl.navigateForward('/tabs/tabs');
  }
}
