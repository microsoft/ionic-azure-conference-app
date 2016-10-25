import { Component } from '@angular/core';
import { PopoverController, ViewController, AlertController } from 'ionic-angular';
import {CodePushUpdate} from '../../providers/codepush-update';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}


@Component({
    templateUrl: 'build/pages/about/about.html',
    providers: [CodePushUpdate]  
})
export class AboutPage {
  conferenceDate = '2047-05-17';
  loggedIn: boolean = false;
  isWindows: boolean;

  constructor(
      public popoverCtrl: PopoverController,
      public alertCtrl: AlertController,
      public updater: CodePushUpdate) {
      this.isWindows = window.cordova.platformId === 'windows';
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  checkAndInstallUpdates() {
      this.updater.checkForUpdate().then((remotePackage) => {
          if (!remotePackage) {
              let alert = this.alertCtrl.create({
                  title: 'No update available!',
                  subTitle: 'We could not find any update.',
                  buttons: ['Ok']
              });
              alert.present();
          } else {
              console.log('update available: ' + remotePackage.appVersion);
              let alert = this.alertCtrl.create({
                  title: 'Update ' + remotePackage.appVersion + ' available',
                  message: 'Would you like to update your app?',
                  buttons: [
                      {
                          text: 'Yes',
                          handler: () => {
                              this.updater.installPackage(remotePackage);
                          }
                      },
                      {
                          text: 'No',
                          handler: () => {

                          }
                      }
                  ]
              });
              alert.present();
          }
      });
  }
}
