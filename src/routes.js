import Static from './components/LogEntry/Static/Static.vue';
import Dynamic from './components/LogEntry/Dynamic/Dynamic.vue';
import LogList from './components/Overview/LogList/LogList.vue';
import Setting from './components/Setting/Setting.vue';

export default [
  {path: '/', component:Dynamic},
  {path: '/StaticLog', component:Static},
  {path: '/Overview', component:LogList },
  {path: '/Setting', component:Setting}
]
