import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    isAuth: false,
    token:'',
    id:0,
    type: '',
  },
  mutations: {
    login(state) {
      state.isAuth=true;
      state.token=localStorage.token;
      state.id=localStorage.id_acheteur;
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('id_acheteur');

      state.isAuth=false;
      state.token=null;
      state.id_acheteur=undefined;
    }
  },
  actions: {
    LOGIN(state, {email, password}){
      {email, password}


      state.commit('login', response);
    },
    LOGOUT(state){
      state.commit('logout');
    }
  }
});

export default store;