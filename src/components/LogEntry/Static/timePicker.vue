<template>
  <v-layout row wrap>
    <v-flex md12 lg4 lg-offset8 id='timePicker'>
      <v-time-picker :value="startTimePickerState" @input="timePickerStateChange" format="24hr" dark></v-time-picker>
      <p>{{startTimePickerState}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      startTimePickerState() {
        return this.$store.state.startTimePickerState
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
