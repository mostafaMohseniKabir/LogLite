<template>
  <v-layout row wrap>
    <v-flex md12 lg4 lg-offset8 id='timePicker'>
      <v-time-picker scrollable :value="timePickerStateIsEnd?endTimePickerState:startTimePickerState" @input="timePickerStateChange"  format="24hr" dark></v-time-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';
  export default {
    computed: {
      ...mapState([
        'startTimePickerState',
        'endTimePickerState',
        'timePickerStateIsEnd'
      ])
    },
    methods: {
      ...mapMutations([
        'timePickerStateChange'
      ])
    }
  }
</script>


<style media="screen">
  #timePicker {
    overflow: ;
  }
</style>
