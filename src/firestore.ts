import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import { getApp } from './firebase/firebase';

const app = getApp();
const db = app.firestore();


Vue.use(firestorePlugin);

const firestore = {
    words: db.collection('words'),
    topics: db.collection('topics'),
    config: db.collection('config'),
};

export default firestore;
