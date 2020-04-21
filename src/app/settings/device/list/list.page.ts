import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  path = 'StandBy/';

  concat: any;

  refe = firebase.database().ref(this.path);

  constructor(
    public router: Router,
    private storage: Storage
  ) {
    this.storage.get('User')
    .then(
      data => this.refe.child('Concat').set(data),
      error => console.error('Error getting item', error)
    );
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

  openNamePage() {
    this.storage.get('User').then((data) => {
      this.refe.child('Concat').set(data);
    });

    this.router.navigate(['/name']);
  }
}
