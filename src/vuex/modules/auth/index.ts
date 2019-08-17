import { ActionContext } from 'vuex';

export interface AuthUser {
    displayName: string;
    email: string;
    photoUrl: string;
}

export interface AuthState {
    user: AuthUser;
    isAuth: boolean;
}

export default {
    state: {
        user: null,
        isAuth: false,
    },
    mutations: {
       setAuth: (state: AuthState, user: any) => {
           state.user = user;
           state.isAuth = true;
           return state;
        },
       clearAuth: (state: AuthState) => ({ ...state, user: null, isAuth: false }),
    },
    actions: {
       login: (context: ActionContext<AuthState, any>, action: any) => {
           // TODO:
       },
       logout: (context: ActionContext<AuthState, any>, action: any) => {
           // TODO:
       },
    },
    getters: {
        user: (state: AuthState) => state.user,
        isAuth: (state: AuthState) => state.isAuth,
    },
};
