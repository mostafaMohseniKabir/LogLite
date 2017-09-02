<template>
  <v-layout row wrap>
    <v-flex md12 lg4 id='datePicker'>
      <v-date-picker :value="datePickerState" @input="datePickerStateChange" actions dark></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      datePickerState() {
        return this.$store.state.datePickerState
      }
    },
    methods: {
      datePickerStateChange(payload) {
        this.$store.commit('datePickerStateChange', payload);
      }
    }
  }
</script>


<style media="screen">
  #datePicker {
    overflow: scroll;
  }
</style>
