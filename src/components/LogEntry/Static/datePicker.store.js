import * as types from '../mutation-types'

//state
const state () {
  return {
    datePickerState: null
  }
},

// mutations
const mutations = {
  [types.datePickerStateChange] (state, payload) {
    state.datePickerState = payload
  }
}

export default {
  state,
  mutations
}
