<template>
  <el-time-picker
    :value="startTimePickerState"
    @input="startTimePickerStateChange"
    placeholder="start time">
  </el-time-picker>
</template>


<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'startTimePickerState',
    ]),
  },
  methods: {
    ...mapMutations([
      'startTimePickerStateChange',
    ]),
  }
}
</script>


<style media="screen">
  #timePicker {
    text-align: center;
  }
</style>
