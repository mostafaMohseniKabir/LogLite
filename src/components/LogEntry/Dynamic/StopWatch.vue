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
var moment = require('moment');
moment().format();
export default {
  components: {
  },
  data() {
    return {
      stopWatch: moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:SS'),
      myVar: null,
      runState: false
      }
  },
  computed: {
  },
  methods: {
    stopWatchStarted: function() {
      this.runState = true;
      var counter = 1;
      this.$store.commit('stopWatchStarted');
      this.myVar = setInterval(() => {
         this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(counter+=10).format('H:mm:ss:SS');
       },10)
    },
    stopWatchEnded: function() {
      this.runState = false;
      clearInterval(this.myVar);
      this.$store.commit('stopWatchEnded');
    },
    stopWatchReseted: function() {
      this.runState = false;
      clearInterval(this.myVar);
      this.stopWatch = moment().hour(0).minute(0).second(0).millisecond(0).format('H:mm:ss:SS');
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
