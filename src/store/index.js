import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        token(state) {
            return state.token
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token)
        },
        destroyToken({commit}) {
            commit('destroyToken')
        }
    },
    plugins: [createPersistedState()],
});

export default store;