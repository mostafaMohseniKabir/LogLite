<template>
  <div>
    <v-stepper v-model="staticSteppersState">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="staticSteppersState > 1">Stert Time
          <small>Select start time of the task!</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="staticSteppersState > 2">End Time
          <small>Select end time of the task!</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="staticSteppersState > 3">Date
          <small>Select date of the task!</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="staticSteppersState > 4">Description
          <small>Write or select a tag for the task!</small>
        </v-stepper-step>
      </v-stepper-header>


      <v-stepper-content step="1">
        <app-timePicker></app-timePicker>
        <v-btn primary @click.native="staticSteppersState = 2" @click="submitStartTime">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <app-timePicker></app-timePicker>
        <v-btn primary @click.native="staticSteppersState = 3" @click="submitEndTime">Continue</v-btn>
        <v-btn flat @click.native="staticSteppersState = 1" @click="submitEndTime">Previous</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <app-datePicker></app-datePicker>
        <v-btn primary @click.native="staticSteppersState = 4">Continue</v-btn>
        <v-btn flat @click.native="staticSteppersState =2" @click="submitEndTime">Previous</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <app-logInfo></app-logInfo>
        <v-btn primary @click.native="staticSteppersState = 1" @click="submitLogInfo">Finish</v-btn>
        <v-btn flat @click.native="staticSteppersState = 3">Previous</v-btn>
      </v-stepper-content>
    </v-stepper>
    <!-- snackbar for submit -->
    <app-submit-snackbar></app-submit-snackbar>
  </div>
</template>


<script>
import datePicker from './datePicker.vue';
import timePicker from './timePicker.vue';
import LogInfo from '../common/LogInfo.vue';
import SubmitSnackbar from '../common/SubmitSnackbar.vue';
import {mapMutations} from 'vuex';
export default {
  data () {
    return {
      staticSteppersState: 1
    }
  },
  components: {
    'app-datePicker': datePicker,
    'app-timePicker': timePicker,
    'app-logInfo': LogInfo,
    'app-submit-snackbar': SubmitSnackbar
  },
  methods: {
    ...mapMutations([
      'submitStartTime',
      'submitEndTime',
      'submitLogInfo'
    ])
  }
}
</script>
