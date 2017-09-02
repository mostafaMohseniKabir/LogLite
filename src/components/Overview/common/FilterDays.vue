<template>
  <v-card class="elevation-0" dark>
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Filter by Date</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="dates"
              :value="filterDatesState"
              @input="filterDatesStateChange"
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
      filterDatesState() {
        return this.$store.state.filterDatesState
      },
      dates() {
        return this.$store.state.dates
      }
    },
    methods: {
      filterDatesStateChange(payload) {
        this.$store.commit('filterDatesStateChange', payload);
      }
    }
  }
</script>
