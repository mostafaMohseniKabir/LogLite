
<template>
  <el-dialog
    title="Tips"
    :visible.sync="dialogVisible"
    size="tiny">
    <span>Are you sure to delete this?</span>
    <span slot="footer" class="dialog-footer">
      <el-button style="color: #000000; background-color: #ffb000" @click="dialogVisibleChange(false)">Cancel</el-button>
      <el-button style="color: #000000; background-color: #ffb000" @click="handleConfirm()">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';
  export default {
    computed: {
      ...mapState([
        'dialogVisible',
      ]),
    },
    methods: {
      ...mapMutations([
        'dialogVisibleChange',
      ]),


  }
</script>
