<template>
  <v-card class="secondary elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              label="Select"
              v-bind:items="items"
              v-model="e3"
              v-bind:rules="[() => e3 && e3.text && e3.text.length > 0 || 'Please select a tag']"
              item-value="text"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        e3: null,
        items: [
          { text: 'Break' },
          { text: 'MeetLite' },
          { text: 'TechLite' },
          { text: 'Vue.js' }
        ],
        states: [
        ]
      }
    }
  }
</script>
