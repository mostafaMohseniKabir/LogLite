<template>
  <div>
    <v-stepper v-model="dynamicSteppersState">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="dynamicSteppersState > 1">Count your work time
          <small>Push the start button to start counting!</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="dynamicSteppersState > 2">Description
          <small>Write or select a tag for the task!!</small>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-content step="1">
        <app-stopWatch></app-stopWatch>
        <v-btn primary @click.native="dynamicSteppersState = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <app-logInfo></app-logInfo>
        <v-btn  primary @click.native="dynamicSteppersState = 1" @click="submitLogInfo(true)">Finish</v-btn>
        <v-btn flat @click.native="dynamicSteppersState = 1">Previous</v-btn>
      </v-stepper-content>
    </v-stepper>
    <!-- snackbar for submit -->
    <app-submit-snackbar></app-submit-snackbar>
  </div>
</template>

<script>
import StopWatch from './StopWatch.vue';
import LogInfo from '../common/LogInfo.vue';
import SubmitSnackbar from '../common/SubmitSnackbar.vue';
import {mapMutations} from 'vuex';

export default {
  data () {
    return {
      dynamicSteppersState: 1
    }
  },
  components: {
    'app-logInfo': LogInfo,
    'app-stopWatch': StopWatch,
    'app-submit-snackbar': SubmitSnackbar
  },
  methods: {
    ...mapMutations([
      'submitLogInfo'
    ])
  }
}
</script>
