<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Filter by Date</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              :items="datesInventory"
              :value="filterDatesState"
              @input="filterDatesStateChange"
              label="Select"
              append-icon="filter_list"
              max-height="400"
              hint="Pick any dates you want!"
              persistent-hint
              autocomplete
            ></v-select>
          </v-flex>
      </v-container>
    </v-card-text>
  </v-card>
</template>


<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState([
      'filterDatesState'
    ]),
    ...mapGetters([
      'datesInventory'
    ])
  },
  methods: {
    ...mapMutations([
      'filterDatesStateChange'
    ])
  }
}
</script>
