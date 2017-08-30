<template>
  <v-tabs dark fixed icons centered>
    <v-tabs-bar slot="activators" class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="#tab-1">
        <v-icon>view_headline</v-icon>
        Log List
      </v-tabs-item>
      <v-tabs-item href="#tab-2">
        <v-icon>assessment</v-icon>
        Statistics
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content
      :key="1"
      :id="'tab-' + 1"
    >
      <v-card flat xs6>
        <app-log-list></app-log-list>
      </v-card>
    </v-tabs-content>

    <v-tabs-content
      :key="2"
      :id="'tab-' + 2"
    >
      <v-card flat>
        <app-statistics></app-statistics>
      </v-card>
    </v-tabs-content>

  </v-tabs>
</template>


    <script>
      import Statistics from './Statistics/Statistics.vue';
      import LogList from './LogList/LogList.vue';
      export default {
        data () {
          return {
          }
        },
        components: {
          'app-log-list': LogList,
          'app-statistics': Statistics
        }
      }
    </script>
