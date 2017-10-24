<!-- <template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="Date"
      width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Name"
      width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Name: {{ scope.row.name }}</p>
          <p>Addr: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="Operations">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template> -->


<template>
  <v-container fluid>
    <!-- component for filters -->
    <app-filter-tags></app-filter-tags>
    <app-filter-days-in-logList></app-filter-days-in-logList>
    <v-divider></v-divider>
    <!-- component for logs list information -->
    <v-layout row>
      <v-flex xs-12>
        <v-list two-line subheader>
          <v-subheader>Logs Informaton</v-subheader>
          <v-list-tile avatar v-for="logInfo in filteredLogsInfoInLogList" :key="logInfo.__id">
            <v-list-tile-avatar>
              <v-icon class="blue white--text">assignment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{logInfo.tag}}</v-list-tile-title>
              <v-list-tile-sub-title>{{logInfo.startTime}} to {{logInfo.endTime}} in {{logInfo.date}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn slot="activator" @click.native.stop="dialog = true" class="blue mt-2 mr-3" ripple v-tooltip:left="{ html: 'Delete Log' }"  icon>
                <v-icon class="blue white--text text--lighten-1">delete_forever</v-icon>
              </v-btn>
              <!-- dialog box -->
              <v-dialog v-model="dialog" lazy absolute>
                <v-card>
                  <v-card-title>
                    <div class="headline">Seriously?!</div>
                  </v-card-title>
                  <v-card-text>Are you sure you want to delete this log information from logs list?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Nope</v-btn>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false" @click="deleteLogInfo(logInfo)">Yep</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- snackbar for delete action -->
              <app-delete-snackbar></app-delete-snackbar>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <!-- component for total duration -->
        <app-calculator></app-calculator>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import FilterDaysInLogList from './FilterDaysInLogList.vue';
  import FilterTags from './FilterTags.vue';
  import Calculator  from './Calculator.vue';
  import SnackbarForDelete from './SnackbarForDelete.vue';
  import { mapState } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }],
        dialog: false
      }
    },
      components: {
        'app-filter-tags': FilterTags,
        'app-filter-days-in-logList': FilterDaysInLogList,
        'app-calculator': Calculator,
        'app-delete-snackbar': SnackbarForDelete
      },
      computed: {
        ...mapGetters([
          'filteredLogsInfoInLogList'
        ])
      },
      methods: {
        ...mapMutations([
          'deleteLogInfo'
        ]),
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
    }
  }
</script>
