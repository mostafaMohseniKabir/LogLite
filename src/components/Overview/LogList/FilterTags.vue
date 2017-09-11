<template>
  <v-card class="elevation-0" dark>
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Filter by Tags</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="tagsInOverview"
              :value="filterTagsState"
              @input="filterTagsStateChange"
              label="Select"
              append-icon="filter_list"
              max-height="400"
              hint="Pick any tag you want!"
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
      'filterTagsState',
      'tagsInOverview'
    ])
  },
  methods: {
    ...mapMutations([
      'filterTagsStateChange'
    ])
  }
}
</script>
