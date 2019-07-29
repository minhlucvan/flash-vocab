import { firestoreAction } from 'vuexfire';
import { ActionContext, Action } from 'vuex';
import { getDb } from '@/firebase/firebase';
import { ApplicationError } from '@/errors';
import { ApplicationErrorAction } from '../config/actions';
import { randomPick } from '@/utils/array';

const db = getDb();

class WordNotFoundError extends ApplicationErrorAction {
    constructor() {
        super('word not found!');
    }
}

export interface WordsState {
    words: any;
    word: any;
}

export default {
    state: {
        words: [],
        word: null,
    },
    mutations: {
        setWord: (state: WordsState, word: any) => {
           state.word = word;
        },
        clearWord: (state: WordsState, word: any) => {
            state.word = null;
        },
    },
    actions: {
        bindWords: firestoreAction(
            (context) =>
             context.bindFirestoreRef('words', db.collection('words')),
        ),
        bindWordBySlug: async (context: ActionContext<WordsState, any>, { set, topic, slug }: any) => {
            const res = await db.collection('words').where('slug', '==', slug).get();
            const doc = res.docs.shift();
            if ( !doc ) {
                return context.dispatch(new WordNotFoundError());
            }

            const word = doc.data();
            context.commit('setWord', word);
        },
        bindWordsByTopic: firestoreAction(async (context, action: any) => {
            const slug = action.slug;

            const res = await context.dispatch('bindTopicBySlug', { slug });
            return context.dispatch('shuffleWordOfTopic');
        }),
        shuffleWordOfTopic: firestoreAction(async (context) => {
            const words = ((context.rootState as any).topics.topic.words);
            const wordRef = randomPick(words);
            return  context.bindFirestoreRef('word', wordRef);
        }),
    },
};
