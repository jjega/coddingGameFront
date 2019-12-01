import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    isAuth: false,
    token:'',
    id:0,
    type: '',
    user: {}
  },
  getters: {
    id: state => state.user.id,
    token: state => state.user.token,
    isAuth: state => state.isAuth,
    type: state => state.type,
    user: state => state.user
  },
  mutations: {
    login(state, user) {
      const { token, type, id } = user;
      localStorage.setItem('token', token);
      state.isAuth = true;
      state.token  = token;
      state.type   = type;
      state.id     = id;
      state.user   = user;
    },
    logout(state) {
      localStorage.delItem('token');
      state.isAuth = false;
      state.token  = null;
      state.type   = null;
      state.id     = null;
      state.user   = null;
    }
  },
  actions: {
    LOGIN_EMPEROR(state, emperor) {
      emperor['type'] = 'Emperor';
      state.commit('login', emperor);
    },
    LOGIN_LUDUS(state, ludus) {
      ludus['type'] = 'ludus';
      state.commit('login', ludus);
    },
    LOGOUT(state){
      state.commit('logout');
    }
  }
});

export default store;