<template>
      <v-card>
        <!-- component for filters -->
        <v-layout>
          <v-flex >
            <app-filter-tags></app-filter-tags>
          </v-flex>
          <v-flex>
            <app-filter-days-in-logList></app-filter-days-in-logList>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <!-- component for logs list information -->
        <v-list two-line subheader>
          <v-subheader inset>Logs Informaton</v-subheader>
          <v-list-tile avatar v-for="logInfo in filteredLogsInfoInLogList">
            <v-list-tile-avatar>
              <v-icon class="blue white--text">assignment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{logInfo.tag}}</v-list-tile-title>
              <v-list-tile-sub-title>{{logInfo.startTime}} to {{logInfo.endTime}} in {{logInfo.date}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <!-- dialog box -->
              <v-dialog v-model="dialog" lazy absolute>
                <v-btn slot="activator" class="blue ma-2" ripple v-tooltip:left="{ html: 'Delete Log' }"  icon>
                  <v-icon class="blue white--text text--lighten-1">delete_forever</v-icon>
                </v-btn>
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
      </v-card>
</template>


<script>
  import FilterDaysInLogList from './FilterDaysInLogList.vue';
  import FilterTags from './FilterTags.vue';
  import Calculator  from './Calculator.vue';
  import SnackbarForDelete from './SnackbarForDelete.vue';
  import {mapState} from 'vuex';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';
  export default {
      data() {
        return {
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
        ])
    }
  }
</script>
