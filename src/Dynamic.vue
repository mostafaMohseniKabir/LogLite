<template>
  <v-stepper v-model="state" vertical @input="changeState">
    <v-stepper-step step="1" v-bind:complete="state > 1">
      Stert Time
      <small>Select start time of the task!</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <app-timer></app-timer>
      <v-btn primary @click.native="state = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="2" v-bind:complete="state > 2">
      Description
      <small>Write or select a tag for the task!</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <app-textField></app-textField>
      <v-btn primary @click.native="state = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

  <script>
  import datePicker from './datePicker.vue';
  import timePicker from './timePicker.vue';
  import textField from './textField.vue';
  import timer from './timer.vue';
  export default {
    data () {
      return {
        state: 1
      }
    },
    components: {
      'app-datePicker': datePicker,
      'app-timePicker': timePicker,
      'app-textField': textField,
      'app-timer': timer
    }
  }
</script>
