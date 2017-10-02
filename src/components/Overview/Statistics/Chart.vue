<template>
  <v-layout>
    <v-flex xs12>
      <section class="container">
        <chartjs-bar :labels="chartLabels" :data="chartDatas" :option="myoption" :bind="true" :backgroundcolor="chartBackgroundColor"></chartjs-bar>
      </section>
    </v-flex>
  </v-layout>
</template>


<script>
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
          myoption:{
            responsive:true,
            maintainAspectRatio:true,
            title: {
                display: true,
                position: 'bottom',
                text: 'Report'
            },
            scales: {
                yAxes: [{
                    stacked: true
                }]
            }
        }
      }
    },
    computed: {
      ...mapGetters([
        'chartLabels',
        'chartDatas',
        'chartBackgroundColor',
      ])
    }
  }
</script>
