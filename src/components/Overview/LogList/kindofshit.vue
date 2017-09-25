<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Filter by Tags</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="tagsInventory"
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
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState([
      'filterTagsState'
    ]),
    ...mapGetters([
      'tagsInventory'
    ])
  },
  methods: {
    ...mapMutations([
      'filterTagsStateChange'
    ])
  }
}
</script>
