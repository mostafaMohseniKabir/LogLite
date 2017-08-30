<template>
  <v-layout row wrap>
    <v-flex md12 lg4 lg-offset8>
      <v-time-picker v-model="timePickerState" format="24hr" dark></v-time-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        timePickerState: null,
      }
    }
  }
</script>
