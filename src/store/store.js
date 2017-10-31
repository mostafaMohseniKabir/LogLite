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
    toolbarColor: 'rgba(255, 176, 0, 1)',
    navbarColor: 'rgba(31, 45, 64, 1)',
    dialog: false,
    datePickerState: null,
    startTimePickerState: null,
    convertedStartTime: null,
    endTimePickerState: null,
    durationState: null,
    inputTagState: [],
    filterTagSelect: [],
    rangeDate: '',
    logsInfo: [],
    wis: 101,
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  mutations: {
    replaceLogInfo: (state, payload) => {
      state.logsInfo.splice([state.logsInfo.length-1], 1, payload)
    },
    dialogVisibleChange: (state, payload) => {
      state.toolbarColor = payload;
    },
    toolbarColorChange: (state, payload) => {
      state.toolbarColor = payload;
    },
    navbarColorChange: (state, payload) => {
      state.navbarColor = payload;
    },
    rangeDateChange: (state, payload) => {
      state.rangeDate = payload;
    },
    importFromServer: (state, payload) => {
      state.logsInfo = payload;
    },
    stopWatchStarted: state => {
      state.datePickerState = moment().format('YYYY-MM-DD');
      state.startTimePickerState = moment();
    },
    stopWatchEnded: state => {
      state.endTimePickerState = moment();
    },
    datePickerStateChange: (state, payload) => {
      state.datePickerState = moment(payload).format('YYYY-MM-DD');
    },
    startTimePickerStateChange: (state, payload) => {
      state.startTimePickerState = payload;
      state.convertedStartTime = moment(payload).format('HH:mm:ss');
    },
    endTimePickerStateChange: (state, payload) => {
      state.endTimePickerState = payload;
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
    filterTagSelectChange: (state, payload) => {
      state.filterTagSelect = payload;
    },
    deleteLogInfo: (state, payload) => {
      //call action
      store.dispatch('removeLogInfo', payload);
      //delete logsInfo from the view
      state.logsInfo.splice(payload,1);
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
      // calculate duration
      state.durationState = moment.utc(moment(state.endTimePickerState).diff(moment(state.startTimePickerState))).format("HH:mm:ss");
      // convert start time and end time to standard format
      state.endTimePickerState = moment(state.endTimePickerState).format('HH:mm:ss');
      state.startTimePickerState = moment(state.startTimePickerState).format('HH:mm:ss');
      //push to state
      state.logsInfo.push({
          tag: state.inputTagState,
          startTime: state.startTimePickerState,
          endTime: state.endTimePickerState,
          date: state.datePickerState,
          duration: state.durationState,
          wis: state.wis,
      });
      //reset states
      state.startTimePickerState = new Date();
      state.endTimePickerState = null;
      state.inputTagState = [];
      //call action
      store.dispatch('insertLogInfo')
    }
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getters: {

    // totalDuration: (state, getters) =>
    //   moment.utc(R.reduce(R.add, 0, R.map(x => x.duration, getters.filteredLogsInfoInLogList))).format("HH:mm:ss"),
    // dataSets: (state, getters) => R.reduce((acc, logIngo) => R.has(logIngo.tag)(acc) ?
    //    R.assoc(logIngo.tag, logIngo.tag + logIngo.duration, acc) :
    //    R.assoc(logIngo.tag, logIngo.duration, acc), {}, getters.filteredLogsInfoInStatistics),
    //
    // chartLabels: (state, getters) => R.keys(getters.dataSets),  //output an array that contains labels of chart
    //
    // chartDatas: (state, getters) => R.map(x => x/60000, R.values(getters.dataSets)), //output an array that contains data (values) of chart
    //
    // chartBackgroundColor: (state, getters) => R.map(() => 'rgba(' + Math.floor(Math.random()*256) +
    //    ',' + Math.floor(Math.random()*256) + ',' +
    //    Math.floor(Math.random()*256) + ', 0.5)', Array(getters.chartLabels.length)),

    datesInventory: state => R.uniq(R.map(x => R.prop('date', x), state.logsInfo)),

    filteredLogInfoByDate: state => (state.rangeDate) ?
      (state.logsInfo.filter((logInfo) => (moment(state.rangeDate[0]) <= moment(logInfo.date) &&  moment(logInfo.date) <= moment(state.rangeDate[1])) ? true : false))
      : (state.logsInfo),

    tagsInventory: (state, getters) => R.uniq(R.unnest(R.map(x => R.prop('tag', x), getters.filteredLogInfoByDate))),

    doubledFlitredLogsInfo: (state, getters) => getters.filteredLogInfoByDate.filter((logInfo) =>
      R.reduce(R.and, true, R.map(x => R.contains(x, logInfo.tag), state.filterTagSelect))),

    filterTags: (state, getters) => R.map(tag => R.zipObj(['text', 'value'], [tag, tag]), getters.tagsInventory),


    },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actions: {
    fetchLogsInfo ({ commit, state }) {
      request
        .get('http://localhost:3080')
        .set('Access-Control-Allow-Origin', '*')
        .query({ wis: state.wis })
        .end(function(err, res){
          commit('importFromServer', res.body )
        })
      },
      insertLogInfo ({ commit, state }) {
        request
          .post('http://localhost:3080/insertLogInfo')
          .set('Access-Control-Allow-Origin', '*')
          .send(state.logsInfo[state.logsInfo.length-1])
          .end(function(err, res){
              //  err || !res.ok ? alert('Oh no! error') : alert('yay got')
               commit('replaceLogInfo', JSON.parse(res.text) )
           })
      },
      removeLogInfo ({ commit, state }, payload) {
        request
          .get('http://localhost:3080/deleteLogInfo')
          .set('Access-Control-Allow-Origin', '*')
          .query({ _id: state.logsInfo[payload]._id })
          .end(function(err, res){
              //  err || !res.ok ? alert('Oh no! error') : alert('yay deleted')
           })
      },
    }
})
