<template>
  <el-select
    :value="inputTagState"
    @input="inputTagStateChange"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="Choose or add tags">
    <el-option
      v-for="tag in tagsInventory"
      :key="tag"
      :label="tag"
      :value="tag">
    </el-option>
  </el-select>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'inputTagState'
    ]),
    ...mapGetters([
      'tagsInventory'
    ])
  },
  methods: {
    ...mapMutations([
      'inputTagStateChange'
    ])
  }
}
</script>
