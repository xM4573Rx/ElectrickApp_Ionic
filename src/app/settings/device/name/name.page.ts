import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {

  path = 'Groups/';
  path2 = 'StandBy/';

  valor: string;
  name: any;
  group: any;
  concat: any;
  device: any;

  i: any = 0;

  refe = firebase.database().ref(this.path);
  refe2 = firebase.database().ref(this.path2);

  constructor(
    public router: Router,
    private storage: Storage
  ) {
    // this.storage.get('User')
    // .then(
    //   data => this.refe2.child('Concat').set(data),
    //   error => console.error(error)
    // );
    // this.storage.get('Name')
    // .then(
    //   data => this.name = data,
    //   error => console.error('Error getting item', error)
    // );

    // this.storage.get('GROUP')
    // .then(
    //   data => this.group = data,
    //   error => console.error('Error getting item', error)
    // );

    // this.storage.get('I')
    // .then(
    //   data => this.i = data,
    //   error => console.error('Error getting item', error)
    // );
  }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.concat = snap.child('Concat').val();

      if (this.concat != null) {
        this.storage.get('Concat').then((data) => {
          if (data != null) {
            data = this.concat;
            this.storage.set('Concat', data);
          } else {
            let variable: any;
            variable = this.concat;
            this.storage.set('Concat', variable);
          }
        });

        this.refe.child('Concat').remove();
      }
    });
  }

  openHomePage() {
    this.storage.get('User').then((data) => {
      this.refe2.child('Concat').set(data);
    });

    this.refe2.once('value', snap => {
      this.concat = snap.child('Concat').val();

      this.storage.get('Count').then((data) => {
        data = data + 1;
        this.device = 'Device' + data;

        this.refe.child(this.concat).child(this.device).child('name').set(this.valor);

        this.storage.get('Count').then((val) => {
          if (val != null) {
            val = data;
            this.storage.set('Count', val);
          } else {
            let variable: any;
            variable = data;
            this.storage.set('Count', variable);
          }
        });
      });
      this.refe2.child('Concat').remove();
    });

    this.router.navigate(['/tabs/tabs']);
  }
}
