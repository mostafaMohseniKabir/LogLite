import Static from './components/LogEntry/Static/Static.vue';
import Dynamic from './components/LogEntry/Dynamic/Dynamic.vue';
import LogList from './components/Overview/LogList/LogList.vue';
import Statistics from './components/Overview/Statistics/Statistics.vue';
import Setting from './components/Setting/Setting.vue';

export default [
  {path: '/', component:Static},
  {path: '/Dynamic', component:Dynamic},
  {path: '/Overview/LogList', component:LogList },
  {path: '/Overview/Statistics', component:Statistics},
  {path: '/Setting/Setting', component:Setting}
]
