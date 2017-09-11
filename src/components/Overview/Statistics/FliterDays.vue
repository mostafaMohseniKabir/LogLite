<template>
  <v-card class="elevation-0" dark>
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Filter by Date</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              :items="dates"
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
      </v-container>
    </v-card-text>
  </v-card>
</template>


<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState([
      'filterDatesState2',
      'dates'
    ])
  },
  methods: {
    ...mapMutations([
      'filterDatesStateChange2'
    ])
  }
}
</script>
