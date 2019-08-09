import { firestoreAction } from 'vuexfire';
import { ActionContext, Action } from 'vuex';
import { Firebase  } from '../../../firebase/firebase';
import { ApplicationErrorAction } from '../config/actions';

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
           Firebase.login();
       },
       logout: (context: ActionContext<AuthState, any>, action: any) => {
            Firebase.getApp().auth().signOut();
       },
    },
    getters: {
        user: (state: AuthState) => state.user,
        isAuth: (state: AuthState) => state.isAuth,
    },
};
