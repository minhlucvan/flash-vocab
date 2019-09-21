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
    currentSlug: string;
}

export default {
    namespaced: true,
    state: {
        topics: [],
        currentSlug: '',
    },
    mutations: {
         setTopics: (state: TopicsState, topics: any) => {
            state.topics = topics;
         },
         setSlug: (state: TopicsState, slug: any) => {
            state.currentSlug = slug;
         },
    },
    actions: {
        getTopics: async (context: ActionContext<TopicsState, any>) => {
            const res = await api.getTopics(context.rootGetters.topicsFile);
            const topics = res.result;
            return context.commit('setTopics', topics );
        },
        selectTopic: async (context: ActionContext<TopicsState , any>, { slug }: any) => {
            if ( !context.getters.hasTopics ) {
                await context.dispatch('getTopics');
            }
            return context.commit('setSlug', slug);
        },
    },
    getters: {
        current: (state: TopicsState) => state.topics && state.topics.find((top) => top.slug === state.currentSlug),
        hasTopics: (state: TopicsState) => state && state.topics && state.topics.length > 0,
    },
};
