<template>
      <v-card>

        <v-layout>
          <v-flex >
            <slot name="filterTag"></slot>
          </v-flex>
          <v-flex>
            <slot name="filterDay"></slot>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-list two-line subheader>
          <v-subheader>Logs Informaton</v-subheader>
          <v-list-tile avatar v-for="logInfo in filteredLogsInfoInLogList">
            <v-list-tile-action>
              <v-btn  v-tooltip:top="{ html: 'Delete Log' }" small outline fab class="grey" @click='deleteLogInfo(logInfo)'>
                <v-icon>delete_forever</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{logInfo.tag}}</v-list-tile-title>
              <v-list-tile-sub-title>{{logInfo.startTime}} to {{logInfo.endTime}} in {{logInfo.date}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <app-calculator></app-calculator>

      </v-card>
</template>


<script>
  import Calculator  from './Calculator.vue';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';
  export default {
      components: {
        'app-calculator': Calculator
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
