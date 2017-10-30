<template>
  <div>
    <div id="clock" style="color:#ffffff">
      {{stopWatch}}
    </div>
    <el-tooltip :disabled="disabled" content="click to stop!" placement="right" effect="light">
      <el-button
      style="color: #000000; background-color: #ffb000"
      @click='!runState ? stopWatchStarted() : stopWatchEnded()'>
        <i v-if = "!runState" class="el-icon-caret-right"></i>
        <i v-if = "runState" class="el-icon-loading"></i>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
var moment = require('moment');   //moment.js library
moment().format();
export default {
  data() {
    return {
      stopWatch: moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:S'),
      myVar: null,
      runState: false,
      disabled: true,
      }
  },
  methods: {
    stopWatchStarted: function() {
      this.disabled = false;
      var counter = 1;
      this.runState = true;    //for switch in DOM (between play and pause state)
       //start point set to 1 every times this function is called
      this.$store.commit('stopWatchStarted');  //to save start time of stopwatch
      this.myVar = setInterval(() => {    //every 10 millisecond add 10 milliseconds to counter and show it in standard format
         this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(counter+=10).format('H:mm:ss:S');
       },10)
    },
    stopWatchEnded: function() {
      this.disabled = true;
      this.runState = false;
      clearInterval(this.myVar);
      // this.$store.commit('dynamicSteppersStateChange', 2);
      this.$store.commit('stopWatchEnded');  //to save stop time of stopwatch
    },
    stopWatchReseted: function() {
      this.runState = false;
      clearInterval(this.myVar);  //stop stopwatch (setInterval)
      this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:S');  //reset stopWatch
    }
  }
}
</script>

<style scoped>
  #clock {
    font-size: 5em;
    margin: 0;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .expand-fade-leave-active {
    margin-left: 20px;
    opacity: 0;
  }
</style>
