import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import config, { ConfigState } from './vuex/modules/config';
import words, { WordsState } from './vuex/modules/words';
import topics, { TopicsState } from './vuex/modules/topics';
import auth, { AuthState  } from './vuex/modules/auth';


Vue.use(Vuex);

export interface AppState {
  config: ConfigState;
  words: WordsState;
  topics: TopicsState;
  auth: AuthState;
}

export default new Vuex.Store<any>({
  mutations: {
    ...vuexfireMutations,
  },
  modules: {
    config,
    words,
    topics,
    auth,
  },
});
