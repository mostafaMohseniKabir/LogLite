<template>
  <v-card class="secondary elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>

            <!-- <v-text-field
              name="input-2"
              label="Label Text"
              value="Input text"
              class="input-group--focused"
              dark
            ></v-text-field> -->

            <v-select
              label="Select"
              v-bind:items="tagsInEntry"
              :value="selectTagState" @input="selectTagStateChange"
              v-bind:rules="[() => selectTagState && selectTagState.text && selectTagState.text.length > 0 || 'Please select a tag']"
              item-value="text"
              autocomplete
            >
          </v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    computed: {
      selectTagState() {
        return this.$store.state.selectTagState
      },
      tagsInEntry() {
        return this.$store.state.tagsInEntry
      }
    },
    methods: {
      selectTagStateChange(payload) {
        this.$store.commit('selectTagStateChange', payload);
      }
    }
  }
</script>
