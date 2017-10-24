import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import Routes from './routes';
import {store} from './store/store';
import 'chart.js';
import 'hchs-vue-charts';

Vue.use(ElementUI);
Vue.use(VueCharts);
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
