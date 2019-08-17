import { ActionContext } from 'vuex';
import { ApplicationErrorAction } from '../config/actions';
import * as api from '../../../apis/api';
import { ITopic } from '@/models/Topic';

class TopicNotFoundError extends ApplicationErrorAction {
    constructor() {
        super('topic not found!');
    }
}

export interface TopicsState {
    topics: ITopic[];
    currectSlug: string;
}

export default {
    namespaced: true,
    state: {
        topics: [],
        currectSlug: '',
    },
    mutations: {
         setTopics: (state: TopicsState, topics: any) => {
            state.topics = topics;
         },
         setSlug: (state: TopicsState, slug: any) => {
            state.currectSlug = slug;
         },
    },
    actions: {
        getTopics: async (context: ActionContext<TopicsState, any>) => {
            const res = await api.getTopics();
            const topics = res.result;
            return context.commit('setTopics', topics );
        },
        selectTopic: async (context: ActionContext<TopicsState , any>, { slug }: any) => {
            return context.commit('setSlug', slug);
        },
    },
};
