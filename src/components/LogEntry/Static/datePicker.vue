<template>
  <v-layout row wrap>
    <v-flex md12 lg4 >
      <v-date-picker id='datePicker' :value="datePickerState" @input="datePickerStateChange" actions year-icon></v-date-picker>
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
    
  }
</style>
