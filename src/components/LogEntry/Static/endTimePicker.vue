<template>
  <el-time-picker
    :value="endTimePickerState"
    @input="endTimePickerStateChange"
    placeholder="end time">
  </el-time-picker>
</template>


<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'endTimePickerState',
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
