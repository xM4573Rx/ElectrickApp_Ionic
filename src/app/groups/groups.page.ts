import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  users = 'StandBy/';
  user: any = {};
  email: any;
  name: any;
  flag: any;
  refe = firebase.database().ref(this.users);

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public nativeStorage: NativeStorage
  ) {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/groups', true) && this.router.url === '/groups') {
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      }
    });
  }

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

    this.nativeStorage.getItem('GROUP')
    .then(
      // data => this.flag = 1,
      data => this.router.navigate(['/groups-two']),
      error => console.error(error)
    );
  }

  openNewPage() {
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

    this.router.navigate(['/new']);
  }
}
