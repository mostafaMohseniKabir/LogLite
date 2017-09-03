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
    inputTagState: null,
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
    inputTagStateChange: (state, payload) => {
      state.inputTagState = payload;
    },
    snackbarStateChange: (state, payload) => {
      state.snackbarState = payload;
    },
    chooseTagFromMenu: (state, payload) => {
      state.inputTagState = payload;
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
        tag: state.inputTagState,
        startTime: state.startTimePickerState,
        endTime: state.endTimePickerState,
        date: state.datePickerState,
      });

      //avoid to add repeatitive tags
      var tagFlag = false;
      for(var i=0, len=state.tagsInEntry.length; i<len; i++) {
        if( (state.tagsInEntry)[i].text === state.inputTagState ) {
          tagFlag = true;
          break;
        }
      }
      if(!tagFlag){
        state.tagsInEntry.push({
          text: state.inputTagState
        });
        state.tagsInOverview.push({
          text: state.inputTagState
        });
      }

        //avoid to add repeatitive dates
        var dateFlag = false;
        for(var i=0, len=state.dates.length; i<len; i++) {
          if( (state.dates)[i].text === state.datePickerState ) {
            dateFlag = true;
            break;
          }
        }
        if(!dateFlag){
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
      return state.logsInfo.filter((logInfo) => {   //filter by tags
        if(state.filterTagsState.text.match('All')){
          return true
        } else if(logInfo.tag) {  //checks if tag isn't selected by user
          return logInfo.tag.match(state.filterTagsState.text)
        }
        })
        .filter((filteredLogInfoByTag) => {   //filter by dates
          return filteredLogInfoByTag.date.match(state.filterDatesState.text)
        })
      }
    },

  actions: {
  }
})
