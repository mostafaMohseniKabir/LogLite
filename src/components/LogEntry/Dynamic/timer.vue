<!-- <template>
  <div class="iCountUp">
    <i-count-up
      :start="0"
      :end="0"
      :decimals="0"
      :duration="1"
      :options="options"
      :callback="callback"
    ></i-count-up>
    <v-btn error fab large dark>
      <v-icon>play_arrow</v-icon>
    </v-btn>
    <v-btn warning fab large dark>
      <v-icon>stop</v-icon>
    </v-btn>
    <v-btn primary fab large dark>
      <v-icon>restore</v-icon>
    </v-btn>
  </div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'view',
    components: {
      'i-count-up': ICountUp
    },
    data() {
      return {
        options: {
          useEasing: false,
          useGrouping: true,
          separator: ':',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      }
    },
    methods: {
      callback: function(ins) {
          ins.update(ins.endVal + 1000);
      }
    }
  };
</script>

<style scoped>
  .iCountUp {
    font-size: 8em;
    margin: 0;
    color: #00BCD4;
  }
</style> -->
