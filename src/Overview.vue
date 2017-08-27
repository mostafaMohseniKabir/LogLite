<template>
  <v-tabs dark fixed icons centered>
    <v-tabs-bar slot="activators" class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="#tab-1">
        <v-icon>view_headline</v-icon>
        Today logs
      </v-tabs-item>
      <v-tabs-item href="#tab-2">
        <v-icon>assessment</v-icon>
        Statistic
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content
      v-for="i in 2"
      :key="i"
      :id="'tab-' + i"
    >
      <v-card flat>
        <app-steppers :enterState='enterState' @stateChanged='enterState=$event'></app-steppers>
      </v-card>
    </v-tabs-content>
  </v-tabs>
</template>


    <script>
      import Steppers from './Steppers.vue';
      export default {
        data () {
          return {
            enterState : 1
          }
        },
        components: {
          'app-steppers': Steppers
        }
      }
    </script>
