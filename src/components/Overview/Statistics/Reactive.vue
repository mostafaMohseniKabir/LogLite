<script>
  //Importing Bar and mixins class from the vue-chartjs wrapper
  import {Doughnut, mixins} from 'vue-chartjs'
  //Getting the reactiveProp mixin from the mixins module.
  const { reactiveProp } = mixins
  export default Doughnut.extend({
    mixins: [reactiveProp],
    data () {
      return {
        //Chart.js options that control the appearance of the chart
        options: {
          scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return '$' + tooltipItems.yLabel;
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                height: 200
        }
      }
    },
    mounted () {
      // this.chartData is created in the mixin and contains all the data needed to build the chart.
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
