import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import LogEntry from './LogEntry.vue';
import Overview from './Overview.vue';
import Filter from './Filter.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.component('app-filter', Filter);

const routes = [
  {path: '/', component:LogEntry},
  {path: '/Overview', component:Overview}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
