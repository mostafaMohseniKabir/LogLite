<template>
  <v-card class="elevation-0" dark>
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Appended icon</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="days"
              :value="filterDaysState"
              @input="filterDaysStateChange"
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
      filterDaysState() {
        return this.$store.state.filterDaysState
      },
      days() {
        return this.$store.state.days
      }
    },
    methods: {
      filterDaysStateChange(payload) {
        this.$store.commit('filterDaysStateChange', payload);
      }
    }
  }
</script>
