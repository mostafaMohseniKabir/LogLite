<template>
  <el-time-picker
    :value="endTimePickerState"
    @input="endTimePickerStateChange"
    placeholder="end time"
    :picker-options="{
      selectableRange: '13:54:11' + ' - 23:59:59',
    }">
  </el-time-picker>
</template>


<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'endTimePickerState',
      'convertedStartTime',
    ]),
  },
  methods: {
    ...mapMutations([
      'endTimePickerStateChange',
    ]),
  }
}
</script>


<style media="screen">
  #timePicker {
    text-align: center;
  }
</style>
