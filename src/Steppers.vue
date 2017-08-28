<template>
  <v-stepper v-model="state" vertical>
    <v-stepper-step step="1" v-bind:complete="state > 1">
      Timer
      <small>Time is money!:)</small>
    </v-stepper-step>
    <v-stepper-content step="1">
          <app-datePicker></app-datePicker>
      <v-btn primary @click.native="state = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" v-bind:complete="state > 2">Description</v-stepper-step>
    <small>Customize log cards</small>
    <v-stepper-content step="2">
      <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
      <v-btn primary @click.native="state = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

  <script>
  import datePicker from './datePicker.vue'
  export default {
    data () {
      return {
        state: 1
      }
    },
    components: {
      'app-datePicker': datePicker
    }
  }
</script>
