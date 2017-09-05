<template>
  <v-layout row wrap>
    <v-flex md12 lg4 id='datePicker'>
      <v-date-picker :value="datePickerState" @input="datePickerStateChange" actions dark></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState([
      'datePickerState'
    ])
  },
  methods: {
    ...mapMutations([
      'datePickerStateChange'
    ])
    }
}
</script>


<style media="screen">
  #datePicker {
    overflow: ;
  }
</style>
