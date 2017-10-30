<template>
  <div>
    <el-date-picker
     :value="rangeDate"
     @input="rangeDateChange"
     type="daterange"
     placeholder="Pick a range"
     style="margin-top:10px; margin-left: 10px">
    </el-date-picker>

    <el-select
    :value="filterTagSelect"
    @input="filterTagSelectChange"
    multiple
    placeholder="Filter Tags">
      <el-option
        v-for="tag in tagsInventory"
        :key="tag"
        :label="tag"
        :value="tag">
      </el-option>
    </el-select>

    <el-table
      :data="doubledFlitredLogsInfo"
      border
      highlight-current-row
      tooltip-effect="dark"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%; margin-top: 20px">

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
        sortable
        show-overflow-tooltip
        align="center"
        min-width="125">
      </el-table-column>

      <el-table-column
        prop="endTime"
        label="End Time"
        sortable
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
        :filters="filterTags" :filter-method="filterTag" filter-placement="bottom">
          <template scope="scope">
              <div slot="reference" class="name-wrapper">
                <template v-for="tag in scope.row.tag">
                  <el-tag style="margin-left: 10px; color: #000000; background-color: #ffb000">{{ tag }}</el-tag>
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
          <el-button @click="hadnleDelete(scope.$index)" icon="delete" size="small" style="color: #000000; background-color: #ffb000">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      size="tiny">
      <span>Are you sure to delete this?</span>
      <span slot="footer" class="dialog-footer">
        <el-button style="color: #000000; background-color: #ffb000" @click="dialogVisible = false">Cancel</el-button>
        <el-button style="color: #000000; background-color: #ffb000" @click="handleConfirm()">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  const R = require('ramda');
  var moment = require('moment');
  moment().format();

  import { mapState } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  export default {
      components: {

      },
      data() {
        return {
          index: null,
          dialogVisible: false,
        };
      },
      computed: {
        ...mapState([
          'rangeDate',
          'filterTagSelect'
        ]),
        ...mapGetters([
          'filterTags',
          'doubledFlitredLogsInfo',
          'tagsInventory'
        ])
      },
      methods: {
        ...mapMutations([
          'deleteLogInfo',
          'rangeDateChange',
          'filterTagSelectChange'
        ]),
        hadnleDelete(index) {
          this.dialogVisible = true;
          this.index = index;
        },
        handleConfirm() {
          this.dialogVisible = false;
          this.$store.commit('deleteLogInfo', this.index)
          this.$notify.info({
            title: 'Info',
            message: 'Deleted successfully!',
            offset: 200,
            duration: 1500
          });
        },
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
            }
          });
          sums[3] = moment.utc(sums[3]).format("HH:mm:ss")
          return sums;
        },
        filterTag(value, row) {
          console.log(value)
          return R.contains(value, row.tag);
      }
    }
  }
</script>
