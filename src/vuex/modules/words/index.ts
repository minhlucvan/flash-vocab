import { firestoreAction } from 'vuexfire';
import { ActionContext, Action } from 'vuex';
import { Firebase } from '@/firebase/firebase';
import { ApplicationError } from '@/errors';
import { ApplicationErrorAction } from '../config/actions';
import { randomPick } from '@/utils/array';

class WordNotFoundError extends ApplicationErrorAction {
    constructor() {
        super('word not found!');
    }
}

export interface WordsState {
    words: any;
    selectedId: any;
    word: any;
}

export default {
    state: {
        words: [],
        word: null,
        selectedId: null,
    },
    mutations: {
        setWord: (state: WordsState, word: any) => {
           state.word = word;
        },
        clearWord: (state: WordsState, word: any) => {
            state.word = null;
        },
        setWords: (state: any, words: any) => {
            state.words = words;
        },
        selectWord: (state: any, id: any) => {
            state.selectedId = id;
        },
    },
    actions: {
        bindWords: firestoreAction(
            (context) => {
                const db = Firebase.getDb();
                return context.bindFirestoreRef('words', db.collection('words'));
            },
        ),
        bindWordBySlug: async (context: ActionContext<WordsState, any>, { set, topic, slug }: any) => {
            const db = Firebase.getDb();
            const res = await db.collection('words').where('slug', '==', slug).get();
            const doc = res.docs.shift();
            if ( !doc ) {
                return context.dispatch(new WordNotFoundError());
            }

            const word = doc.data();
            context.commit('setWord', word);
        },
        bindWordsByTopic: async (context: any, action: any) => {
            const slug = action.slug;
            const db = Firebase.getDb();
            const queryRef = await db.collection(`words`).where(`topics.${slug}`, '==', true).get();
            const docs = queryRef.docs.map((doc) => doc.data());
            await context.commit('setWords', docs);
            if (docs.length > 0) {
                await context.dispatch('selectWord', { index: 0 });
            }
        },
        shuffleWordOfTopic: firestoreAction(async (context) => {
            const words = ((context.rootState as any).topics.topic.words);
            const wordRef = randomPick(words);
            return  context.bindFirestoreRef('word', wordRef);
        }),
        selectWord: (context: any, action: any) => {
            const word = context.state.words[action.index];
            context.commit('setWord', word);
            context.commit('selectWord', action.index);
        },
        nextWord: (context: any, action: any) => {
            const index = context.state.selectedId + 1;
            context.dispatch('selectWord', { index });
        },
        prevWord: (context: any, action: any) => {
            const index = context.state.selectedId - 1;
            context.dispatch('selectWord', { index });
        },
    },
};
