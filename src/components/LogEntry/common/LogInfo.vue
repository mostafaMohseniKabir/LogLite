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
      v-for="tag in filterTags"
      :key="tag.value"
      :label="tag.text"
      :value="tag.value">
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
      'filterTags'
    ])
  },
  methods: {
    ...mapMutations([
      'inputTagStateChange'
    ])
  }
}
</script>
