<template>
  <v-card class="elevation-0">
    <v-card-text>
          <v-flex xs6 sm6>
            <v-subheader>Filter by Tags</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              label="Select"
              :items="tagsInventory"
              :value="filterTagsState"
              @input="filterTagsStateChange"
              append-icon="filter_list"
              multiple
              chips
              tags
              solo
              clearable
              hint="Pick any tag you want!"
              persistent-hint
              autocomplete
            >
              <template slot="selection" scope="data">
                <v-chip
                   outline
                   class="green green--text"
                   :selected="data.selected"
                 >
                   <strong>{{ data.item }}</strong>
                 </v-chip>
              </template>
            </v-select>
          </v-flex>
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
