import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// vuex
import store from "./store";

import dotenv from 'dotenv'
dotenv.config()

//router
import router from './router';

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App),
})
