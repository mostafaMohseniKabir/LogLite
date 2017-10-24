export const chart = {
  namespaced: true,
  getters: {
    dataSets: (state, getters, rootState, rootGetters) => {
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
  },
}
