<template>
      <v-card>

        <v-toolbar class="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar>

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
          <v-list-tile avatar v-for="(logInfo,index) in filteredLogsInfo">
            <v-list-tile-action>
              <v-btn small outline fab class="grey" @click='deleteLogInfo(index)'>
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{logInfo.tag}}</v-list-tile-title>
              <v-list-tile-sub-title>{{logInfo.startTime}} to {{logInfo.endTime}} in {{logInfo.date}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-card>
</template>


<script>
  export default {
      computed: {
        notification() {
          return this.$store.state.notification
        },
        // checkboxes() {
        //   return this.$store.state.checkboxes
        // },
        filteredLogsInfo() {
          return this.$store.getters.filteredLogsInfo
        }
      },
      methods: {
        checkboxStateChange(payload) {
          this.$store.commit('checkboxStateChange', payload);
        },
        deleteLogInfo(payload) {
          this.$store.commit('deleteLogInfo', payload);
        }
    }
  }
</script>
