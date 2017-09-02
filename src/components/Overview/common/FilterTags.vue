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
              append-icon="map"
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
  export default {
    computed: {
      filterTagsState() {
        return this.$store.state.filterTagsState
      },
      tagsInOverview() {
        return this.$store.state.tagsInOverview
      }
    },
    methods: {
      filterTagsStateChange(payload) {
        this.$store.commit('filterTagsStateChange', payload);
      }
    }
  }
</script>
