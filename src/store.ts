import Vue from 'vue';
import Vuex from 'vuex';
import config, { ConfigState } from './vuex/modules/config';
import words, { WordsState } from './vuex/modules/words';
import topics, { TopicsState } from './vuex/modules/topics';
import auth, { AuthState  } from './vuex/modules/auth';
import { searchRandomImage } from './apis/google';

Vue.use(Vuex);

export interface AppState {
  config: ConfigState;
  words: WordsState;
  topics: TopicsState;
  auth: AuthState;
}

const store = new Vuex.Store<AppState>({
  modules: {
    config,
    words,
    topics,
    auth,
  },
});

store.watch((state) => state.topics.currentSlug, (slug) => {
  store.dispatch('words/selectTopic', slug);
});

store.dispatch('getConfig');

export default store;
