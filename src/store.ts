import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import config, { ConfigState } from './vuex/modules/config';
import words, { WordsState } from './vuex/modules/words';
import topics, { TopicsState } from './vuex/modules/topics';

Vue.use(Vuex);

export interface AppState {
  config: ConfigState;
  words: WordsState;
  topics: TopicsState;
}

export default new Vuex.Store<any>({
  mutations: {
    ...vuexfireMutations,
  },
  modules: {
    config,
    words,
    topics,
  },
});
