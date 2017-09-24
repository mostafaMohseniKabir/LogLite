import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const R = require('ramda');
var moment = require('moment');
moment().format();
const request = require('superagent');

export const store = new Vuex.Store({
  debug: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    datePickerState: null,
    timePickerStateIsEnd: null,
    startTimePickerState: null,
    endTimePickerState: null,
    durationState: null,
    inputTagState: null,
    snackbarState: false,
    filterTagsState: null,
    filterDatesState: null,
    filterDatesState2: null,
    logsInfo: [],
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  mutations: {
    importFromServer: (state, payload) => {
      state.logsInfo =  payload;
    },
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

      //remove from database
      request.post('http://localhost:3000/deleteLogInfo')
        .set('Access-Control-Allow-Origin', '*')
        .send(payload)
        .end(function(err, res){
             if (err || !res.ok) {
               alert('Oh no! error');
             } else {
               alert('yay got');
             }
         })

      //delete logsInfo
      state.logsInfo.splice(R.findIndex(logInfo => R.propEq('startTime', payload.startTime, logInfo) && R.propEq('date', payload.date, logInfo))(state.logsInfo),1);
    },
    filterTagsStateChange: (state, payload) => {
      state.filterTagsState = payload;
    },
    filterDatesStateChange: (state, payload) => {
      state.filterDatesState = payload;
    },
    filterDatesStateChange2: (state, payload) => {
      state.filterDatesState2 = payload;
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

      var newLogsInfo = {
        tag: state.inputTagState,
        startTime: state.startTimePickerState,
        endTime: state.endTimePickerState,
        date: state.datePickerState,
        duration: state.durationState
      };

      state.startTimePickerState = state.endTimePickerState;   //set next startTime to endTime of previous submit
      state.endTimePickerState = null;  //set next endTime to null


      //send to database
      request.post('http://localhost:3000/insertLogInfo')
        .set('Access-Control-Allow-Origin', '*')
        .send(newLogsInfo)
        .end(function(err, res){
             if (err || !res.ok) {
               alert('Oh no! error');
             } else {
               alert('yay got');
             }
         })
    }
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getters: {
    filteredLogsInfoInLogList: state => {
      return state.logsInfo.filter((logInfo) => {   //filter by tags
        if(state.filterTagsState === null){
          return true
        }
        else {
          return logInfo.tag.match(state.filterTagsState)
        }
      })
        .filter((filteredLogInfoByTag) => {   //filter by dates
          if(state.filterDatesState === null){
            return true
          }
          else {
            return filteredLogInfoByTag.date.match(state.filterDatesState)
          }
        })
    },
    totalDuration: (state, getters) => {
      var total = 0;
      for(var i=0, len=getters.filteredLogsInfoInLogList.length; i<len; i++) {
        total += getters.filteredLogsInfoInLogList[i].duration;
      }
      return moment.duration(total, "ms").humanize();
    },
    filteredLogsInfoInStatistics: state => {
      return state.logsInfo.filter((logInfo) => {   //filter by dates
        if(state.filterDatesState2 === null){
          return true
        }
        else {
          return logInfo.date.match(state.filterDatesState2)
        }
      })
    },
    dataSets: (state, getters) => {
      var dataSetsForChart = {};
      for(var i=0, len=getters.filteredLogsInfoInStatistics.length; i<len; i++) {
        var hasName = R.has(getters.filteredLogsInfoInStatistics[i].tag);
        if(hasName(dataSetsForChart)) {  //tag is repeatitive
          dataSetsForChart[getters.filteredLogsInfoInStatistics[i].tag] += getters.filteredLogsInfoInStatistics[i].duration;
        } else {  ////tag isn't repeatitive
          dataSetsForChart[getters.filteredLogsInfoInStatistics[i].tag] = getters.filteredLogsInfoInStatistics[i].duration;
        }
      }
      return dataSetsForChart
    },
    chartLabels: (state, getters) => {   //output an array that contains labels of chart
      return R.keys(getters.dataSets)
    },
    chartDatas: (state, getters) => {   //output an array that contains data (values) of chart
      var minutes =  x => x/60000;
      return R.map(minutes, R.values(getters.dataSets))
    },
    chartBackgroundColor: (state, getters) => {
      var BackgroundColor = [];
      for(var i=0, len=getters.chartLabels.length; i<len; i++){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        BackgroundColor.push('rgba(' + r + ',' + g + ',' + b + ', 0.5)')
      }
      return BackgroundColor
    },
    datesInventory: state => {
      var shit = x => R.prop('date', x);
      return R.uniq(R.map(shit, state.logsInfo))
    },
    tagsInventory: state => {
      var shit = x => R.prop('tag', x);
      return R.uniq(R.map(shit, state.logsInfo))
    }
  },
  actions: {
    fetchLogsInfo (context) {
      console.log('from fetchLogsInfo')
      request
        .get('http://localhost:3000')
        .set('Access-Control-Allow-Origin', '*')
        .end(function(err, res){
          context.commit('importFromServer', res.body )
        });
      }
  }
})
