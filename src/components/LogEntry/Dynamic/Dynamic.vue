
<template>
  <v-container fluid id="stepper"  class='pa-0'>
    <v-layout row>
      <v-flex>
        <v-stepper :value="dynamicSteppersState" @change="dynamicSteppersStateChange">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="dynamicSteppersState > 1">Count your work time
              <small>Push the start button to start counting!</small>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="dynamicSteppersState > 2">Description
              <small>Write or select a tag for the task!!</small>
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-content id="kind" step="1">
                  <app-stopWatch></app-stopWatch>
                  <!-- <v-btn primary @click.native="dynamicSteppersState = 2">Continue</v-btn> -->
          </v-stepper-content>
          <v-stepper-content step="2">
            <app-logInfo></app-logInfo>
            <v-flex xs8 offset-xs2 sm-4 offset-sm4 md3 offset-md5 class='pa-0'>
              <v-btn primary @click.native="dynamicSteppersStateChange(1)" @click="submitLogInfo(true)">Finish</v-btn>
              <v-btn flat @click.native="dynamicSteppersStateChange(1)">Previous</v-btn>
            </v-flex>
          </v-stepper-content>
        </v-stepper>
        <!-- snackbar for submit -->
        <app-submit-snackbar></app-submit-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import StopWatch from './StopWatch.vue';
  import LogInfo from '../common/LogInfo.vue';
  import SubmitSnackbar from '../common/SubmitSnackbar.vue';
  import {mapMutations} from 'vuex';
  import {mapState} from 'vuex';
  export default {
    components: {
      'app-logInfo': LogInfo,
      'app-stopWatch': StopWatch,
      'app-submit-snackbar': SubmitSnackbar
    },
    computed: {
      ...mapState([
        'dynamicSteppersState'
      ])
    },
    methods: {
      ...mapMutations([
        'submitLogInfo',
        'dynamicSteppersStateChange'
      ])
    }
  }
</script>

<style>
   #kind {
     /*overflow: scroll;*/
   }
</style>
