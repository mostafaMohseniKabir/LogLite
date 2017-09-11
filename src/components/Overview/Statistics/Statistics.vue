<template>
  <div>

    <v-layout>
      <v-flex>
        <slot name="filterDay"></slot>
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

export default {
  components: {
    'app-chart': Chart
  }
}
</script>
