import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Routes from './routes';
import {store} from './store/store';

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  store: store,
  router: router,
  el: '#app',
  render: h => h(App)
})
