<template>
  <el-date-picker
    :value="datePickerState"
    @input="datePickerStateChange"
    type="date"
    placeholder="Pick a day">
  </el-date-picker>
</template>



<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'datePickerState'
    ])
  },
  methods: {
    ...mapMutations([
      'datePickerStateChange'
    ])
  }
}
</script>


<style media="screen">
  #datePicker {

  }
</style>
