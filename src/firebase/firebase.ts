import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '@/config';

let app: firebase.app.App;

export function initApp() {
  app = firebase.initializeApp(FIREBASE_CONFIG);
  return app;
}

export function getApp(): firebase.app.App {
  if (!app) {
    return initApp();
  }

  return app;
}


export function getDb() {
  return getApp().firestore();
}
