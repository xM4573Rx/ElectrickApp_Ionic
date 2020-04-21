import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  users = 'users/+573016683176/';
  users2 = 'Groups/';

  email: any;
  name: any;
  group: any;

  refe = firebase.database().ref(this.users);
  refe2 = firebase.database().ref(this.users2);

  constructor(
  ) { }

  ngOnInit() { }
}
