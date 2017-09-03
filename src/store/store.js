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
    snackbarState: false,
    filterTagsState: {text: ""},
    filterDatesState: {text: ""},
    dates: [],
    tagsInEntry: [
      { text: 'Break' },
      { text: 'MeetLite' },
      { text: 'TechLite' },
      { text: 'Vue.js' }
    ],
    tagsInOverview: [
      { text: 'All'},
      { text: 'Break' },
      { text: 'MeetLite' },
      { text: 'TechLite' },
      { text: 'Vue.js' }
    ],
    logsInfo: [],
    filteredLogsInfo: [],
    notification: true
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
    snackbarStateChange: (state, payload) => {
      state.snackbarState = payload;
    },
    checkboxStateChange: (state, payload) => {
      state.notification = payload;
    },
    deleteLogInfo: (state, payload) => {
      state.logsInfo.splice(payload,1);
      state.dates.splice(payload,1)
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
        date: state.datePickerState,
        // select: false
      });
      var flag = false;
      for(var i=0, len=state.dates.length; i<len; i++) {  //avoid to add repeatitive date
        if( (state.dates)[i].text === state.datePickerState ) {
          flag = true;
          break;
        }
      }
      if(!flag){
        state.dates.push({
          text: state.datePickerState
        });
      }

      state.startTimePickerState = state.endTimePickerState;   //set next startTime to endTime of previous submit
      state.endTimePickerState = null;  //set next endTime to null
    }
  },

  getters: {
    filteredLogsInfo: state => {
      return state.logsInfo.filter((logInfo) => {
        if(state.filterTagsState.text.match('All')){
          return true
        } else if(logInfo.tag) {  //checks if tag isn't selected by user
          return logInfo.tag.match(state.filterTagsState.text)
        }
        })
        .filter((filteredLogInfoByTag) => {
          return filteredLogInfoByTag.date.match(state.filterDatesState.text)
        })
      }
    },

  actions: {
  }
})
