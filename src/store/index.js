import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import { chart } from './components/Overview/Statistics/Chart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    	chart
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
