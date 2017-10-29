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
    dialogVisible: false,
    snackbarForDelete: false,
    dialog: false,
    datePickerState: null,
    startTimePickerState: null,
    convertedStartTime: null,
    endTimePickerState: null,
    durationState: null,
    inputTagState: [],
    snackbarState: false,
    rangeDate: '',
    logsInfo: [],
  },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  mutations: {
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
      state.convertedStartTime = moment(payload).format('HH:mm:ss');;
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
    snackbarStateChange: (state, payload) => {
      state.snackbarState = payload;
    },
    snackbarForDeleteStateChange: (state, payload) => {
      state.snackbarForDelete = payload;
    },
    dialogChangeState: (state, payload) => {
      state.dialog = payload;
    },
    deleteLogInfo: (state, payload) => {

      //popover is closed
      state.dialogVisible = false;

      // snackbar is opened
      state.snackbarForDelete = true;


      // const index = R.findIndex(R.propEq('_id', payload))(state.logsInfo)

      //remove from database
      request
        .post('http://localhost:3000/deleteLogInfo')
        .set('Access-Control-Allow-Origin', '*')
        .send(state.logsInfo[payload])
        .end(function(err, res){
             err || !res.ok ? alert('Oh no! error') : alert('yay deleted')
         })

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
      console.log(JSON.stringify(state));
      // snackbar is opened
      state.snackbarState = true;

      // convert start time and end time to standard format
      state.endTimePickerState = moment(state.endTimePickerState).format('HH:mm:ss');
      state.startTimePickerState = moment(state.startTimePickerState).format('HH:mm:ss');


      // calculation of duration
      state.durationState = moment(state.datePickerState + "T" + state.endTimePickerState).diff(moment(state.datePickerState + "T" + state.startTimePickerState));

      state.logsInfo.push({
          tag: state.inputTagState,
          startTime: state.startTimePickerState,
          endTime: state.endTimePickerState,
          date: state.datePickerState,
          duration: state.durationState
      });
      //reset states
      state.startTimePickerState = null;
      state.endTimePickerState = null;
      state.inputTagState = [];
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

    // totalDuration: (state, getters) =>
    //   moment.utc(R.reduce(R.add, 0, R.map(x => x.duration, getters.filteredLogsInfoInLogList))).format("HH:mm:ss"),
    //
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

    tagsInventory: state => R.uniq(R.unnest(R.map(x => R.prop('tag', x), state.logsInfo))),

    filterTags: (state, getters) => R.map(tag => R.zipObj(['text', 'value'], [tag, tag]), getters.tagsInventory),

    filterDate: state => (state.rangeDate) ?
      (state.logsInfo.filter((logInfo) => (moment(state.rangeDate[0]) <= moment(logInfo.date) &&  moment(logInfo.date) <= moment(state.rangeDate[1])) ? true : false))
      : (state.logsInfo),
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
