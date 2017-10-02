<template>
  <v-container fluid grid-list-md text-xs-center class="ma-0 pa-0">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 sm-4 offset-sm4 md3 offset-md5>
        <v-date-picker id='datePicker' :value="datePickerState" @input="datePickerStateChange" actions scrollable year-icon></v-date-picker>
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
