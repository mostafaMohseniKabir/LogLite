<template>
  <v-container fluid grid-list-md text-xs-center class="ma-0 pa-0">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 sm-4 offset-sm4 md3 offset-md5>
        <v-time-picker :value="timePickerStateIsEnd?endTimePickerState:startTimePickerState" @input="timePickerStateChange" scrollable format="24hr"></v-time-picker>
      </v-flex>
    </v-layout>
  </v-container>
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
    text-align: center;
  }
</style>
