<template>
  <v-card class="elevation-0" dark>
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Day</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="tags"
              :value="filterTagsState"
              @input="filterTagsStateChange"
              label="Select"
              single-line
              auto
              append-icon="map"
              hide-details
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
      tags() {
        return this.$store.state.tags
      }
    },
    methods: {
      filterTagsStateChange(payload) {
        this.$store.commit('filterTagsStateChange', payload);
      }
    }
  }
</script>
