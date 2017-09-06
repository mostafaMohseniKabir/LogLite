import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const R = require('ramda');
var moment = require('moment');
moment().format();

export const store = new Vuex.Store({
  debug: true,
  strict: true,
  state: {
    datePickerState: null,
    timePickerStateIsEnd: null,
    startTimePickerState: null,
    endTimePickerState: null,
    durationState: null,
    inputTagState: null,
    snackbarState: false,
    filterTagsState: {text: ""},
    filterDatesState: {text: ""},
    dates: [],
    tagsInEntry: [
      { text: 'Break' },
      { text: 'Vue.js' }
    ],
    tagsInOverview: [
      { text: 'All'},
      { text: 'Break' },
      { text: 'Vue.js' }
    ],
    logsInfo: [],
    filteredLogsInfo: []
  },

  mutations: {
    stopWatchStarted: state => {
      state.datePickerState = moment().format('YYYY-MM-DD');
      state.startTimePickerState = moment().format('H:mm:ss');
    },
    stopWatchEnded: state => {
      state.endTimePickerState = moment().format('H:mm:ss');
    },
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

      //tag and date are stored before deleting them
      var startTimeOfDeletedLog = payload.startTime;
      var tagOfDeletedLog = payload.tag;
      var dateOfDeletedLog = payload.date;

      //delete logsInfo
      state.logsInfo.splice(R.findIndex(logInfo => R.propEq('text', startTimeOfDeletedLog, logInfo) && R.propEq('text', dateOfDeletedLog, logInfo))(state.logsInfo),1);

      //avoid to delete repeatitive tags
      var tagFlag = false;
      for(var i=0, len=state.logsInfo.length; i<len; i++) {
        if( state.logsInfo[i].tag === tagOfDeletedLog ) {
          tagFlag = true;
          break;
        }
      }
      if(!tagFlag){
        ;
        state.tagsInOverview.splice(R.findIndex(R.propEq('text', tagOfDeletedLog))(state.tagsInOverview),1);
      }

      //avoid to delete repeatitive dates
      var dateFlag = false;
      for(var i=0, len=state.logsInfo.length; i<len; i++) {
        if( state.logsInfo[i].date === dateOfDeletedLog ) {
          dateFlag = true;
          break;
        }
      }
      if(!dateFlag){
        state.dates.splice(R.findIndex(R.propEq('text', dateOfDeletedLog))(state.dates),1);
        };
    },
    filterTagsStateChange: (state, payload) => {
      state.filterTagsState = payload;
    },
    filterDatesStateChange: (state, payload) => {
      state.filterDatesState = payload;
    },
    submitLogInfo: (state, payload) => {
      // snackbar is opened
      state.snackbarState = payload;

      // calculation of duration
      state.durationState = moment(state.datePickerState + "T" + state.endTimePickerState).diff(moment(state.datePickerState + "T" + state.startTimePickerState));

      state.logsInfo.push({
          tag: state.inputTagState,
          startTime: state.startTimePickerState,
          endTime: state.endTimePickerState,
          date: state.datePickerState,
          duration: state.durationState
      });

      //avoid to add repeatitive tags
      var tagFlag = false;
      for(var i=0, len=state.tagsInOverview.length; i<len; i++) {
        if( (state.tagsInOverview)[i].text === state.inputTagState ) {
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
      },
      totalDuration: (state, getters) => {
        var total = 0;
        for(var i=0, len=getters.filteredLogsInfo.length; i<len; i++) {
          total += getters.filteredLogsInfo[i].duration;
        }
        return moment.duration(total, "ms").humanize();
        }
    },

  actions: {
  }
})
