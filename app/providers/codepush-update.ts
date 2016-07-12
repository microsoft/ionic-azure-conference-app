import {Injectable} from '@angular/core';

@Injectable()
export class CodePushUpdate {

    constructor() {}

    checkForUpdate(): Promise<IRemotePackage> { 
        return new Promise((resolve, reject) => {            
            if (window.codePush && window.cordova.platformId !== 'windows') {
                window.codePush.checkForUpdate((remotePackage: IRemotePackage) => {
                    resolve(remotePackage)
                });
            } else {
                reject(new Error("No update available"));
            }
        });
     }

    installPackage(remotePackage: IRemotePackage) {
        remotePackage.download(
            (localPackage) => {
                localPackage.install(
                    () => { console.log("Install succeed"); },
                    (error) => {console.log("Error installing package:" + error);},
                    { installMode: InstallMode.IMMEDIATE})
                }
            ,
            (error) => { console.log("error downloading package:" + error); }
        );
    }        
}