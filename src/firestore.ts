import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import { Firebase } from './firebase/firebase';

const app = Firebase.getApp();
const db = app.firestore();


Vue.use(firestorePlugin);

const firestore = {
    words: db.collection('words'),
    topics: db.collection('topics'),
    config: db.collection('config'),
};

export default firestore;
