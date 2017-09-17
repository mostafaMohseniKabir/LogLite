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
        <app-log-list>
          <app-filter-tags slot="filterTag"></app-filter-tags>
          <app-filter-days-in-logList slot="filterDay"></app-filter-days-in-logList>
        </app-log-list>
      </v-card>
    </v-tabs-content>

    <v-tabs-content
      :key="2"
      :id="'tab-' + 2"
    >
      <v-card flat>
        <app-statistics>
            <app-filter-days-in-statistics slot="filterDay"></app-filter-days-in-statistics>
        </app-statistics>
      </v-card>
    </v-tabs-content>

  </v-tabs>
</template>


    <script>
      import Statistics from './Statistics/Statistics.vue';
      import LogList from './LogList/LogList.vue';
      import FilterTags from './LogList/FilterTags.vue';
      import FilterDaysInLogList from './LogList/FilterDaysInLogList.vue';
      import FilterDaysInStatistics from './Statistics/FliterDaysInStatistics.vue';
      export default {
        components: {
          'app-log-list': LogList,
          'app-statistics': Statistics,
          'app-filter-tags': FilterTags,
          'app-filter-days-in-logList': FilterDaysInLogList,
          'app-filter-days-in-statistics': FilterDaysInStatistics
        },
      }
    </script>
