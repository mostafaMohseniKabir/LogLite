import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  debug: true,
  strict: true,
  state: {
    datePickerState: null,
    timePickerState: null,
    selectTagState: null,
    filterTagsState: null,
    filterDaysState: null,
    days: [
      { text: 'Sunday' },
      { text: 'Monday' },
      { text: 'Tuesday' },
      { text: 'Wednesday' }
    ],
    tags: [
      { text: 'Break' },
      { text: 'MeetLite' },
      { text: 'TechLite' },
      { text: 'Vue.js' }
    ]
  },
  getters: {

  },
  mutations: {
    datePickerStateChange: (state, payload) => {
      state.datePickerState = payload;
    },
    timePickerStateChange: (state, payload) => {
      state.timePickerState = payload;
    },
    selectTagStateChange: (state, payload) => {
      state.selectTagState = payload;
    },
    filterTagsStateChange: (state, payload) => {
      state.filterState = payload;
    },
    filterDaysStateChange: (state, payload) => {
      state.filterState = payload;
    }
  },
  actions: {

  }
})
