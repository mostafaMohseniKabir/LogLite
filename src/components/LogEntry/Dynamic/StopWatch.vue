<template>
  <div>
   <div id="clock" class="clock">{{stopWatch}}</div>

    <v-btn error fab large dark @click='!runState ? stopWatchStarted() : stopWatchEnded()'>
      <v-icon v-if = "!runState">play_arrow</v-icon>
      <v-icon v-if= "runState">stop</v-icon>
    </v-btn>
    <v-btn primary fab large dark @click='stopWatchReseted'>
      <v-icon>restore</v-icon>
    </v-btn>
  </div>
</template>

<script>
var moment = require('moment');   //moment.js library
moment().format();
export default {
  data() {
    return {
      stopWatch: moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:SS'),
      myVar: null,
      runState: false
      }
  },
  methods: {
    stopWatchStarted: function() {
      this.runState = true;    //for switch in DOM (between play and pause state)
      var counter = 1;        //start point set to 1 every times this function is called
      this.$store.commit('stopWatchStarted');  //to save start time of stopwatch
      this.myVar = setInterval(() => {    //every 10 millisecond add 10 milliseconds to counter and show it in standard format
         this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(counter+=10).format('H:mm:ss:SS');
       },10)
    },
    stopWatchEnded: function() {
      this.runState = false;
      clearInterval(this.myVar);
      this.$store.commit('stopWatchEnded');  //to save stop time of stopwatch
    },
    stopWatchReseted: function() {
      this.runState = false;
      clearInterval(this.myVar);  //stop stopwatch (setInterval)
      this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:SS');  //reset stopWatch
    }
  }
}
</script>

<style scoped>
  .clock {
    font-size: 8em;
    margin: 0;
    color: #00BCD4;
  }
</style>
