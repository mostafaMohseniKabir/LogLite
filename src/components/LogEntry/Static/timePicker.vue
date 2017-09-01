<template>
  <v-layout row wrap>
    <v-flex md12 lg4 lg-offset8 id='timePicker'>
      <v-time-picker :value="timePickerState" @input="timePickerStateChange" format="24hr" dark></v-time-picker>
      <p>{{timePickerState}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      timePickerState() {
        return this.$store.state.timePickerState
      }
    },
    methods: {
      timePickerStateChange(payload) {
        this.$store.commit('timePickerStateChange', payload);
      }
    }
  }
</script>


<style media="screen">
  #timePicker {
    overflow: scroll;
  }
</style>
