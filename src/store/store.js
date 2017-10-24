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
    dynamicSteppersState: 1,
    snackbarForDelete: false,
    dialog: false,
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
      state.startTimePickerState = moment().format('HH:mm:ss');
    },
    stopWatchEnded: state => {
      state.endTimePickerState = moment().format('HH:mm:ss');
    },
    datePickerStateChange: (state, payload) => {
      state.datePickerState = payload;
    },
    timePickerStateChange: (state, payload) => {
      state.timePickerStateIsEnd ? state.endTimePickerState = payload : state.startTimePickerState = payload
    },
    dynamicSteppersStateChange: (state, payload) => {
      state.dynamicSteppersState = payload;
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
    snackbarForDeleteStateChange: (state, payload) => {
      state.snackbarForDelete = payload;
    },
    chooseTagFromMenu: (state, payload) => {
      state.inputTagState = payload;
    },
    dialogChangeState: (state, payload) => {
      state.dialog = payload;
    },
    deleteLogInfo: (state, payload) => {
      // snackbar is opened
      state.snackbarForDelete = true;

      console.log(payload)
      //delete logsInfo from the view
      state.logsInfo.splice(R.findIndex(logInfo => R.propEq('startTime', payload.startTime, logInfo) && R.propEq('date', payload.date, logInfo))(state.logsInfo),1);

      //remove from database
      request
        .post('http://localhost:3000/deleteLogInfo')
        .set('Access-Control-Allow-Origin', '*')
        .send(payload)
        .end(function(err, res){
             err || !res.ok ? alert('Oh no! error') : alert('yay deleted')
         })
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
    submitLogInfo: state => {
      // snackbar is opened
      state.snackbarState = true;

      // calculation of duration
      state.durationState = moment(state.datePickerState + "T" + state.endTimePickerState).diff(moment(state.datePickerState + "T" + state.startTimePickerState));

      state.logsInfo.push({
          tag: state.inputTagState,
          startTime: state.startTimePickerState,
          endTime: state.endTimePickerState,
          date: state.datePickerState,
          duration: state.durationState
      });

      state.startTimePickerState = state.endTimePickerState;   //set next startTime to endTime of previous submit
      state.endTimePickerState = null;  //set next endTime to null

      //send to database
      request
        .post('http://localhost:3000/insertLogInfo')
        .set('Access-Control-Allow-Origin', '*')
        .send(state.logsInfo[state.logsInfo.length-1])
        .end(function(err, res){
             err || !res.ok ? alert('Oh no! error') : alert('yay got')
         })
    }
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getters: {
    filteredLogsInfoInLogList: state => state.logsInfo.filter((logInfo) =>   //filter by tags
        state.filterTagsState === null ? true : state.filterTagsState.includes(logInfo.tag))
        .filter((filteredLogInfoByTag) =>   //filter by dates
          state.filterDatesState === null ? true : filteredLogInfoByTag.date.match(state.filterDatesState)),

    totalDuration: (state, getters) =>
      moment.utc(R.reduce(R.add, 0, R.map(x => x.duration, getters.filteredLogsInfoInLogList))).format("HH:mm:ss"),

    filteredLogsInfoInStatistics: state => state.logsInfo.filter((logInfo) =>   //filter by dates
       state.filterDatesState2 === null ? true : logInfo.date.match(state.filterDatesState2)),

    dataSets: (state, getters) => R.reduce((acc, logIngo) => R.has(logIngo.tag)(acc) ?
       R.assoc(logIngo.tag, logIngo.tag + logIngo.duration, acc) :
       R.assoc(logIngo.tag, logIngo.duration, acc), {}, getters.filteredLogsInfoInStatistics),

    chartLabels: (state, getters) => R.keys(getters.dataSets),  //output an array that contains labels of chart

    chartDatas: (state, getters) => R.map(x => x/60000, R.values(getters.dataSets)), //output an array that contains data (values) of chart

    chartBackgroundColor: (state, getters) => R.map(() => 'rgba(' + Math.floor(Math.random()*256) +
       ',' + Math.floor(Math.random()*256) + ',' +
       Math.floor(Math.random()*256) + ', 0.5)', Array(getters.chartLabels.length)),

    datesInventory: state => R.uniq(R.map(x => R.prop('date', x), state.logsInfo)).sort(),

    tagsInventory: state => R.uniq(R.map(x => R.prop('tag', x), state.logsInfo)).sort(),

    searchInTagsInventory: (state, getters) => getters.tagsInventory.filter((tag) =>
        !state.inputTagState ? true : tag.match(state.inputTagState)),
  //   getHoursOfStartTime: state => {
  //     if(state.startTimePickerState) {
  //       return parseInt(R.slice(0, 2, state.startTimePickerState))
  //     }
  //     return 0
  //   },
  //   getMinutesOfStartTime: state => {
  //     if(state.startTimePickerState) {
  //       return parseInt(R.slice(3, 5, state.startTimePickerState))
  //     }
  //     return 0
  //   }
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actions: {
    fetchLogsInfo (context) {
      request
        .get('http://localhost:3000')
        .set('Access-Control-Allow-Origin', '*')
        .end(function(err, res){
          context.commit('importFromServer', res.body )
        });
    }
  }
})
