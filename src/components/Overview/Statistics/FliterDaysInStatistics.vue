<template>
  <v-layout row>
    <v-flex xs6>
      <v-subheader>Filter by Date</v-subheader>
    </v-flex>
    <v-flex xs12 sm6>
      <v-select
        :items="datesInventory"
        :value="filterDatesState2"
        @input="filterDatesStateChange2"
        label="Select"
        append-icon="filter_list"
        max-height="400"
        hint="Pick any dates you want!"
        persistent-hint
        autocomplete
      ></v-select>
    </v-flex>
</v-layout>
</template>


<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState([
      'filterDatesState2'
    ]),
    ...mapGetters([
      'datesInventory'
    ])
  },
  methods: {
    ...mapMutations([
      'filterDatesStateChange2'
    ])
  }
}
</script>
