import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  debug: true,
  strict: true,
  state: {
    datePickerState: null,
    startTimePickerState: null,
    endTimePickerState: null,
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
    ],
    logsInfo: []
  },
  mutations: {
    datePickerStateChange: (state, payload) => {
      state.datePickerState = payload;
    },
    timePickerStateChange: (state, payload) => {
      state.startTimePickerState = payload;
    },
    selectTagStateChange: (state, payload) => {
      state.selectTagState = payload;
    },
    filterTagsStateChange: (state, payload) => {
      state.filterState = payload;
    },
    filterDaysStateChange: (state, payload) => {
      state.filterState = payload;
    },
    submitLogInfo : state => {
      state.logsInfo.push({
        tag: state.selectTagState,
        startTime: state.startTimePickerState,
        endTime: state.startTimePickerState,
        date: state.datePickerState
      })
    }
  },
  getters: {
  },
  actions: {

  }
})
