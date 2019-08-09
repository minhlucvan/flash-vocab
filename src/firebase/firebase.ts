import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '@/config';
import store from '@/store';

export class Firebase {

  public static init() {
    this.app = firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

    this.app.auth().onAuthStateChanged((auth) => {
      if ( !auth ) {
         return store.commit('clearAuth');
      }
      const { displayName, photoURL, email }  = auth;
      const user = { displayName, email, photoURL };
      return store.commit('setAuth', user );
    });
  }

  public static  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  public static  logout() {
    firebase.auth().signOut();
  }

  public static getApp(): firebase.app.App {
    return this.app;
  }

  public static getDb() {
    return this.getApp().firestore();
  }

  private static app: firebase.app.App;
}
