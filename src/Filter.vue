<template>
  <v-card class="elevation-0" dark>
    <v-card-text>
      <v-container fluid>
          <v-flex xs6>
            <v-subheader>Appended icon</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="states"
              v-model="e1"
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
    data () {
      return {
        e1: null,
        states: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ]
      }
    }
  }
</script>
