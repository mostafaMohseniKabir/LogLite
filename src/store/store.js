import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  debug: true,
  strict: true,
  state: {
    datePickerState: null,
    timePickerStateIsEnd: null,
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
      if(state.timePickerStateIsEnd) {
        state.endTimePickerState = payload;
      } else {
        state.startTimePickerState = payload;
      }
    },
    submitStartTime: state => {
      state.timePickerStateIsEnd = !state.timePickerStateIsEnd;
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
        endTime: state.endTimePickerState,
        date: state.datePickerState
      })
    }
  },

  getters: {
    // cards: state => {
    //   return state.logsInfo.map(logInfo => {
    //     return{
    //       tag: logInfo.tag,
    //       startTime: logInfo.startTime,
    //       endTime: logInfo.endTime,
    //       date: logInfo.date
    //     }
    //   })
    // }
  },

  actions: {
  }
})
