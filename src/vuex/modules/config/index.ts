import { ApplicationError } from '@/errors';
import { ActionContext, Module } from 'vuex';

export interface ConfigState {
    appName: string;
    config: any;
    error: ApplicationError | null;
}
const options: Module<ConfigState, any> =  {
    state: {
        appName: '',
        config: [],
        error: null,
    },
    mutations: {
        setError: (state: ConfigState, error: any) => {
            state.error = error;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    actions: {
        error: (context: ActionContext<ConfigState, any>, action: any) => {
            context.commit('setError', action);
        },
    },
    getters: {
        error: () => (state: ConfigState) => {
            return state.error;
        },
    },
};
export default options;
