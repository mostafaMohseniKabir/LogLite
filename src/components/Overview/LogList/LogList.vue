<template>
  <div>
    <el-table
      :data="logsInfo"
      border
      highlight-current-row
      tooltip-effect="dark"
      :summary-method="getSummaries"
      show-summary
      style="width: 100% margin-top: 20px">
      <el-table-column
        prop="date"
        label="Date"
        sortable
        show-overflow-tooltip
        align="center"
        min-width="140">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="Start Time"
        show-overflow-tooltip
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="End Time"
        show-overflow-tooltip
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="duration"
        label="Duration"
        sortable
        show-overflow-tooltip
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="tag"
        show-overflow-tooltip
        align="center"
        min-width="360"
        :filters="filterTags" :filter-method="filterTag" filter-placement="bottom-start">
          <template scope="scope">
              <div slot="reference" class="name-wrapper">
                <template v-for="tag in scope.row.tag">
                  <el-tag style="margin-left: 10px" type="warning">{{ tag }}</el-tag>
                </template>
              </div>
          </template>
      </el-table-column>
      <el-table-column
        prop="_id"
        label="action"
        align="center"
        min-width="100">
        <template scope="scope">
          <el-popover
            ref="popover"
            placement="left"
            align="center"
            width="160"
            :value="popoverVisible"
            @input="popoverVisibleChange(true)">
            <p>Are you sure to delete this?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="popoverVisibleChange(false)">cancel</el-button>
              <el-button size="mini" type="primary" @click="deleteLogInfo(scope.row._id)">confirm</el-button>
            </div>
          </el-popover>
          <el-button  v-popover:popover type="danger" icon="delete" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <app-delete-snackbar></app-delete-snackbar>
  </div>
</template>

<script>
  const R = require('ramda');
  var moment = require('moment');
  moment().format();
  import SnackbarForDelete from './SnackbarForDelete.vue';
  import { mapState } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  export default {
      components: {
        'app-delete-snackbar': SnackbarForDelete,
      },
      computed: {
        ...mapState([
          'popoverVisible',
          'logsInfo'
        ]),
        ...mapGetters([
          'filterTags'
        ])
      },
      methods: {
        ...mapMutations([
          'deleteLogInfo',
          'popoverVisibleChange',
        ]),
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = 'Total Duration';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            } else {
              sums[index] = 'N/A';
            }
          });
         sums[3] = moment.utc(sums[3]).format("HH:mm:ss")
         return sums;
       },
       filterTag(value, row) {
        return R.contains(value, row.tag);
      }
    }
  }
</script>
