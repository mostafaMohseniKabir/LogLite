<template>
  <div>
<!-- Filters -->
    <el-row>
      <el-col class="filter">
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
      </el-col>
    </el-row>
<!-- Table -->
    <el-table
      :data="doubledFlitredLogsInfo"
      highlight-current-row
      tooltip-effect="dark"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%; margin-top: 20px">

      <el-table-column
        type="expand"
        fixed>
        <template scope="props">
          <div>
            <el-icon name="date"></el-icon>
            <span style="margin-left: 5px">Date: {{ props.row.date }}</span>
          </div>
           <div>
             <el-icon name="time"></el-icon>
             <span style="margin-left: 5px">Start Time: {{ props.row.startTime }}</span>
          </div>
          <div>
            <el-icon name="time"></el-icon>
            <span style="margin-left: 5px">End Time: {{ props.row.endTime }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="duration"
        label="duration"
        fixed
        sortable
        show-overflow-tooltip
        align="center"
        min-width="155">
      </el-table-column>

      <el-table-column
        prop="tag"
        label="tag"
        show-overflow-tooltip
        min-width="360">
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
        label="Del"
        fixed="right"
        align="center"
        min-width="60">
        <template scope="scope">
          <el-button @click="hadnleDelete(scope.$index)" icon="delete" size="small" style="color: #000000; background-color: #ffb000"></el-button>
        </template>
      </el-table-column>
    </el-table>
<!-- Dialog -->
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
            // offset: 200,
            duration: 1500
          });
        },

        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = 'Total';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  console.log(prev + moment.duration(curr).asMilliseconds())
                  return prev + moment.duration(curr).asMilliseconds();

                } else {
                  return prev;
                }
              }, 0);
            }
          });
          sums[1] = moment.utc(sums[1]).format("HH:mm:ss")
          return sums;
      }


        // getSummaries(param) {
        //   const { columns, data } = param;
        //   const sums = [];
        //   sums[0] = 'Total';
        //   values = data.map(item => Number(item[column.property]));
        //   sums[1] = values.reduce((prev, curr) => {
        //     const value = moment.duration(curr).asMilliseconds();
        //       return prev + curr;
        //   }, 0);
        //   console.log(sums)
        //   sums[1] = moment.utc(sums[1]).format("HH:mm:ss")
        //   return sums;
        // },
        // moment.duration('00:02:03').asMilliseconds()
    }
  }
</script>

<style>
   .filter {
     text-align: center;
   }
</style>
