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
    filterTagsState: {text: ""},
    filterDatesState: {text: ""},
    dates: [],
    tags: [
      { text: 'Break' },
      { text: 'MeetLite' },
      { text: 'TechLite' },
      { text: 'Vue.js' }
    ],
    logsInfo: [],
    filteredLogsInfo: []
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
    submitEndTime: state => {
      state.timePickerStateIsEnd = !state.timePickerStateIsEnd;
    },
    selectTagStateChange: (state, payload) => {
      state.selectTagState = payload;
    },
    filterTagsStateChange: (state, payload) => {
      state.filterTagsState = payload;
    },
    filterDatesStateChange: (state, payload) => {
      state.filterDatesState = payload;
    },
    submitLogInfo: state => {
      state.logsInfo.push({
        tag: state.selectTagState,
        startTime: state.startTimePickerState,
        endTime: state.endTimePickerState,
        date: state.datePickerState
      });
      state.dates.push({
        text: state.datePickerState
      });
      state.startTimePickerState = null;
      state.endTimePickerState = null;
    }
  },

  getters: {
    filteredLogsInfo: state => {
      var filteredLogsInfoByTag = state.logsInfo.filter((logInfo) => {
        return logInfo.tag.match(state.filterTagsState.text)
      })
      return filteredLogsInfoByTag.filter((filteredLogInfoByTag) => {
        return filteredLogInfoByTag.date.match(state.filterDatesState.text)
      })
    }
  },

  actions: {
  }
})
