import { ApplicationError } from '@/errors';
import { ActionContext, Module } from 'vuex';
import { IConfig } from '@/models/Config';
import * as api from '@/apis/api'; 

export interface ConfigState {
    appName: string;
    config: IConfig;
    error: ApplicationError | null;
}
const options: Module<ConfigState, any> =  {
    state: {
        appName: '',
        config: {
            logos: [],
        },
        error: null,
    },
    mutations: {
        setError: (state: ConfigState, error: any) => {
            state.error = error;
        },
        clearError: (state) => {
            state.error = null;
        },
        setConfig: (state, config) => {
            state.config = config;
        },
    },
    actions: {
        getConfig: async (context: ActionContext<ConfigState, any>) => {
            const res = await api.getConfig();
            const config = res.result;
            context.commit('setConfig', config);
        },
        error: (context: ActionContext<ConfigState, any>, action: any) => {
            context.commit('setError', action);
        },
    },
    getters: {
        error: (state: ConfigState) => {
            return state.error;
        },
        logo: (state: ConfigState) => {
            return state.config.logos[Math.floor(Math.random() * state.config.logos.length)];
        },
    },
};
export default options;
