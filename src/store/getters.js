export const filteredLogsInfoInLogList = state => {
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
export const totalDuration = (state, getters) => {
  var total = 0;
  for(var i=0, len=getters.filteredLogsInfoInLogList.length; i<len; i++) {
    total += getters.filteredLogsInfoInLogList[i].duration;
  }
  return moment.duration(total, "ms").humanize();
},
export const filteredLogsInfoInStatistics = state => {
  return state.logsInfo.filter((logInfo) => {   //filter by dates
    return logInfo.date.match(state.filterDatesState.text)
  })
},
export const dataSets = (state, getters) => {
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
export const chartLabels = (state, getters) => {   //output an array that contains labels of chart
  return R.keys(getters.dataSets)
},
export const chartDatas = (state, getters) => {   //output an array that contains data (values) of chart
  var minutes =  x => x/60000;
  return R.map(minutes, R.values(getters.dataSets))
},
export const chartBackgroundColor = (state, getters) => {
  var BackgroundColor = [];
  for(var i=0, len=getters.chartLabels.length; i<len; i++){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    BackgroundColor.push('rgba(' + r + ',' + g + ',' + b + ', 0.5)')
  }
  return BackgroundColor
}
