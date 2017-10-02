<template>
  <v-container fluid>
      <v-flex>
        <app-filter-days-in-statistics></app-filter-days-in-statistics>
      </v-flex>
    <v-divider></v-divider>
    <v-flex>
       <app-chart></app-chart>
    </v-flex>
  </v-container>
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
