<template>
  <v-stepper v-model="dynamicSteppersState" vertical>
    <v-stepper-step step="1" v-bind:complete="dynamicSteppersState > 1">
      Count your work time
      <small>Push the start button to start counting!</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <!-- <app-timer></app-timer> -->
      <v-btn primary @click.native="dynamicSteppersState = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="2" v-bind:complete="dynamicSteppersState > 2">
      Description
      <small>Write or select a tag for the task!</small>
    </v-stepper-step>
    <v-stepper-content step="2">

      <app-logInfo></app-logInfo>
      <app-submit-snackbar></app-submit-snackbar>

      <v-btn primary @click.native="dynamicSteppersState = 1" @click="submitLogInfo(true)">Finish</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import timer from './timer.vue';
import LogInfo from '../common/LogInfo.vue';
import SubmitSnackbar from '../common/SubmitSnackbar.vue';
export default {
  data () {
    return {
      dynamicSteppersState: 1
    }
  },
  components: {
    'app-logInfo': LogInfo,
    'app-timer': timer,
    'app-submit-snackbar': SubmitSnackbar
  },
  methods: {
    submitLogInfo(payload) {
      this.$store.commit('snackbarStateChange', payload);
    }
  }
}
</script>
