<template>
  <v-container fluid grid-list-md text-xs-center class="ma-0 pa-0">
    <v-layout row wrap>
      <v-flex xs12 id="clock">
        {{stopWatch}}
      </v-flex>
      <v-flex xs12 align-content-center>
        <v-btn error fab dark small @click='!runState ? stopWatchStarted() : stopWatchEnded()'>
          <v-icon v-if = "!runState">play_arrow</v-icon>
          <v-icon v-if= "runState">stop</v-icon>
        </v-btn>
      </v-flex>
        <!-- <v-btn success fab dark small @click='stopWatchReseted'>
          <v-icon>restore</v-icon>
        </v-btn> -->
    </v-layout>
  </v-container>
</template>

<script>
var moment = require('moment');   //moment.js library
moment().format();
export default {
  data() {
    return {
      stopWatch: moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:S'),
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
         this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(counter+=10).format('H:mm:ss:S');
       },10)
    },
    stopWatchEnded: function() {
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
</style>
