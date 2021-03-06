import { ApplicationErrorAction } from '../config/actions';
import { IWord } from '@/models/Word';
import { ActionContext, Module } from 'vuex';
import * as api from '@/apis/api';
import * as giphy from '@/apis/giphy';
import Vue from 'vue';
import { stat } from 'fs';

class WordNotFoundError extends ApplicationErrorAction {
    constructor() {
        super('word not found!');
    }
}
export interface IWordsPlayer {
    wordIds: string[];
    topicSlug: string;
    wordIndex: number;
    size: number;
    ttl: number;
    paused: boolean;
}

export interface WordsState {
    words: IWord[];
    player: IWordsPlayer;
}

const wordModule: Module<WordsState, any> = {
    namespaced: true,
    state: {
        words: [],
        player: {
            wordIds: [],
            topicSlug: '',
            wordIndex: 0,
            size: 0,
            ttl: 30,
            paused: true,
        },
    },
    mutations: {
       setWords: (state: WordsState, words: IWord[]) => {
            state.words = words;
       },
       setIds: (state: WordsState, ids: string[]) => {
            state.player.wordIds = ids;
       },
       setTopic: (state: WordsState, slug: string) => {
        state.player.topicSlug = slug;
       },
       setWordIndex: (state: WordsState, index: number) => {
        state.player.wordIndex = index;
       },
       updateWord: (state: WordsState, word: any) => {
        if ( !word || !word.id ) {
            return;
        }

        const index = state.words.findIndex((w) => w.id === word.id);

        if (  index < 0) {
            return;
        }
        Vue.set(state.words, index, { ...state.words[index], ...word });
       },
    },
    actions: {
       getWords: async (context: ActionContext<WordsState, any>) => {
            const res = await api.getWords(context.rootGetters.wordsFile);

            const words  = (res.result || []).map((word, index) => {
                word.id = word.id || '' + index;
                word.langCode = word.langCode || 'zh';
                word.voice = word.voice || 'Chinese Female';

                if (!word.topics) {
                    word.topics = word.topics || {};
                    if (word.index <= 300) {
                        word.topics['topic-1'] = true;
                    } else if ( word.index <= 600) {
                        word.topics['topic-2'] = true;
                    } else if (word.index <= 900) {
                        word.topics['topic-3'] = true;
                    }  else if (word.index <= 1200) {
                        word.topics['topic-4'] = true;
                    }  else if (word.index <= 1500) {
                        word.topics['topic-5'] = true;
                    }  else if (word.index <= 1800) {
                        word.topics['topic-6'] = true;
                    } else {
                        word.topics['topic-7'] = true;
                    }
                }

                return word;
            });
            context.commit('setWords', words);
       },
       selectWordByTopic: (context: ActionContext<WordsState, any>, slug) => {
            const words: IWord[] = context.getters.wordsByTopics(slug || context.state.player.topicSlug);
            const ids = words.map((word) => word.id);
            context.commit('setIds', ids);
       },
       selectTopic: async (context: ActionContext<WordsState, any>, slug) => {
           if ( !context.getters.hasWords ) {
               await context.dispatch('getWords');
           }
           await context.commit('setTopic', slug);
           return context.dispatch('selectWordByTopic');
       },
       next: (context: ActionContext<WordsState, any>) => {
            context.commit('setWordIndex', context.getters.nextIndex);
       },
       back: (context: ActionContext<WordsState, any>) => {
        context.commit('setWordIndex', context.getters.prevIndex);
       },
       changeImage: async (context: ActionContext<WordsState, any>, slug) => {
            const word = context.getters.wordByIndex(slug);
            const res = await giphy.random(word.word);
            if ( !res || !res.data || !(res.data as any).image_url) {
                return;
            }
            return context.commit('updateWord', { id: word.id, img: (res.data as any).image_url});
        },
    },
    getters: {
        wordsByTopics: (state) => (topic: string) => {
            return (state.words || []).filter((word) => word && word.topics && word.topics[topic]);
        },
        hasWords: (state) => (state && state.words && state.words.length > 0),
        hasNext:  (state) => (state && state.player && state.player.wordIndex < state.player.wordIds.length - 1),
        hasPrev:  (state) => (state && state.player && state.player.wordIndex > 0),
        prevIndex:  (state, getters) => (getters.currentIndex - 1),
        nextIndex:  (state, getters) => (getters.currentIndex + 1),
        currentIndex:  (state) => (state && state.player && +state.player.wordIndex || 0),
        currentWord: (state, getters) =>  getters.wordByIndex(getters.currentIndex),
        playingWords: (state) =>  state.words.filter((word) => state.player.wordIds.includes(word.id)),
        wordByIndex: (state) =>
            (index: number) =>
                state.words.find((word) => word.id === state.player.wordIds[index]),
    },
};

export default wordModule;
