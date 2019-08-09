import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firestore from './firestore';

import './styles/index.scss';
import './sui';
import './registerServiceWorker';
import { Firebase } from './firebase/firebase';

Vue.config.productionTip = false;

Firebase.init();

new Vue({
  router,
  store,
  // firestore,
  render: (h) => h(App),
}).$mount('#app');
