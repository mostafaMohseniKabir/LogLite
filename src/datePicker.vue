<template>
  <v-layout row wrap>
    <v-flex md12 lg4>
      <v-date-picker v-model="datePickerState" actions dark></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        datePickerState: null,
      }
    }
  }
</script>
