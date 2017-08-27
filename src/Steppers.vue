<template>
  <v-stepper v-model="e6" vertical @input="changeState">
    <v-stepper-step step="1" v-bind:complete="e6 > 1">
      Timer
      <small>Time is money!:)</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
      <v-btn primary @click.native="e6 = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" v-bind:complete="e6 > 2">Description</v-stepper-step>
    <small>Customize log cards</small>
    <v-stepper-content step="2">
      <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
      <v-btn primary @click.native="e6 = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

  <script>
  export default {
    props: ["enterState"],
    data () {
      return {
        e6: 1
      }
    },
    methods:{
      changeState(event) {
        this.enterState = event.target.value;
        this.$emit('stateChanged', this.enterState);
      }
    }
  }
</script>
