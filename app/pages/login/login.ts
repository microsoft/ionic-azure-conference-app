import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(provider: string) {
      this.userData.login(provider);
      this.navCtrl.push(TabsPage);
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
