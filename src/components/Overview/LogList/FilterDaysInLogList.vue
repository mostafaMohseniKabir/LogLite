<template>
  <div>
  <v-layout row>
    <v-flex xs6>
      <v-subheader>Filter by Date</v-subheader>
    </v-flex>
    <v-flex xs12 sm6>
      <v-select
        :items="datesInventory"
        :value="filterDatesState"
        @input="filterDatesStateChange"
        label="Select"
        append-icon="filter_list"
        max-height="400"
        hint="Pick any dates you want!"
        persistent-hint
        autocomplete
      ></v-select>
    </v-flex>
  </v-layout>

  <!-- <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      placeholder="Pick a range"
      :picker-options="pickerOptions2">
    </el-date-picker> -->
  </div>
</template>


<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  // data() {
  //     return {
  //       pickerOptions2: {
  //         shortcuts: [{
  //           text: 'Last week',
  //           onClick(picker) {
  //             const end = new Date();
  //             const start = new Date();
  //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
  //             picker.$emit('pick', [start, end]);
  //           }
  //         }, {
  //           text: 'Last month',
  //           onClick(picker) {
  //             const end = new Date();
  //             const start = new Date();
  //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
  //             picker.$emit('pick', [start, end]);
  //           }
  //         }, {
  //           text: 'Last 3 months',
  //           onClick(picker) {
  //             const end = new Date();
  //             const start = new Date();
  //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
  //             picker.$emit('pick', [start, end]);
  //           }
  //         }]
  //       },
  //       value6: '',
  //       value7: ''
  //     };
  //   },
  computed: {
    ...mapState([
      'filterDatesState'
    ]),
    ...mapGetters([
      'datesInventory'
    ])
  },
  methods: {
    ...mapMutations([
      'filterDatesStateChange'
    ])
  }
}
</script>
