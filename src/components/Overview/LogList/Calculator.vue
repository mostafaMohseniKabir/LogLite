<template>
  <v-list two-line subheader>
    <v-subheader>Total</v-subheader>
    <v-list-tile avatar>
      <v-list-tile-action>
        <v-btn  v-tooltip:top="{ html: 'Delete Log' }" small outline fab class="grey">
          <v-icon>done_all</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{filterTagsState}} in {{filterDatesState}}</v-list-tile-title>
        <v-list-tile-sub-title>{{totalDuration}}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapState([
        'filterTagsState',
        'filterDatesState'
      ]),
      ...mapGetters([
        'totalDuration'
      ])
    },
    methods: {

    }
  }
</script>
