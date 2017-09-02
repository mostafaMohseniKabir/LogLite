<template>
  <v-stepper v-model="staticSteppersState" vertical>
    <v-stepper-step step="1" v-bind:complete="staticSteppersState > 1">
      Stert Time
      <small>Select start time of the task!</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <app-timePicker></app-timePicker>
      <v-btn primary @click.native="staticSteppersState = 2" @click="submitStartTime">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="2" v-bind:complete="staticSteppersState > 2">
      End Time
      <small>Select end time of the task!</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <app-timePicker></app-timePicker>
      <v-btn primary @click.native="staticSteppersState = 3" @click="submitEndTime">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="3" v-bind:complete="staticSteppersState > 3">
      Date
      <small>Select date of the task!</small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <app-datePicker></app-datePicker>
      <v-btn primary @click.native="staticSteppersState = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4" v-bind:complete="staticSteppersState > 4">
      Description
      <small>Write or select a tag for the task!</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <app-logInfo></app-logInfo>
      <v-btn primary @click.native="staticSteppersState = 1" @click="submitLogInfo">Finish</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

  <script>
  import datePicker from './datePicker.vue';
  import timePicker from './timePicker.vue';
  import LogInfo from '../common/LogInfo.vue';
  export default {
    data () {
      return {
        staticSteppersState: 1
      }
    },
    components: {
      'app-datePicker': datePicker,
      'app-timePicker': timePicker,
      'app-logInfo': LogInfo
    },
    methods: {
      submitStartTime() {
        this.$store.commit('submitStartTime');
      },
      submitEndTime() {
        this.$store.commit('submitEndTime');
      },
      submitLogInfo() {
        this.$store.commit('submitLogInfo');
      }
    }
  }
</script>
