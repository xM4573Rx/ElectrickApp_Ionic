import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#33000000');
      }

      this.router.navigate(['/register']);
      this.splashScreen.hide();

      timer(2500).subscribe(() => this.showSplash = false);
    });
  }
}
