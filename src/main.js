import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import LogEntry from './components/LogEntry/LogEntry.vue';
import Overview from './components/Overview/Overview.vue';
import Filter from './components/Overview/common/Filter.vue';

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
