import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router/'
import store from './states/'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  store,
  router,

  components: { App },
  template: '<App/>'
})
