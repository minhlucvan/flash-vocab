import { firestoreAction } from 'vuexfire';
import { getDb } from '@/firebase/firebase';
import { ActionContext } from 'vuex';
import { ApplicationErrorAction } from '../config/actions';

const db = getDb();

class TopicNotFoundError extends ApplicationErrorAction {
    constructor() {
        super('topic not found!');
    }
}

export interface TopicsState {
    topics: any;
    topic: any;
}

export default {
    state: {
        topics: [],
        topic: null,
    },
    mutations: {
        setTopic: (state: TopicsState, topic: any) => {
            state.topic = topic;
         },
         clearTopic: (state: TopicsState) => {
            state.topic = null;
         },
    },
    actions: {
        bindTopics: firestoreAction((context) => {
            return context.bindFirestoreRef('topics', db.collection('topics'));
        }),
        bindTopicBySlug: async (context: ActionContext<TopicsState , any>, { slug }: any) => {
            const res = await db.collection('topics').where('slug', '==', slug).get();
            const doc = res.docs.shift();
            if ( !doc ) {
                return context.dispatch(new TopicNotFoundError());
            }
            const topic = doc.data();
            return context.commit('setTopic', topic);
        },
    },
};
