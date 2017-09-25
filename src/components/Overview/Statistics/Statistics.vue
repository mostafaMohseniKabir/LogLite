<template>
  <div>

    <v-layout>
      <v-flex>
        <app-filter-days-in-statistics></app-filter-days-in-statistics>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout>
       <app-chart></app-chart>
    </v-layout>

  </div>
</template>

<script>
import Chart from './Chart.vue';
import FilterDaysInStatistics from './FliterDaysInStatistics.vue';

export default {
  components: {
    'app-filter-days-in-statistics': FilterDaysInStatistics,
    'app-chart': Chart
  }
}
</script>
