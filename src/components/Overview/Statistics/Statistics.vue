<template>
  <div>

    <v-layout>
      <v-flex>
        <slot name="filterDay"></slot>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-card>
        <app-chart></app-chart>
        </v-card>
      </v-flex>
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
