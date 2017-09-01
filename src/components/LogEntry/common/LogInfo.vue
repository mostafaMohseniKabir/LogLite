<template>
  <v-card class="secondary elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              label="Select"
              v-bind:items="tags"
              :value="selectTagState" @input="selectTagStateChange"
              v-bind:rules="[() => selectTagState && selectTagState.text && selectTagState.text.length > 0 || 'Please select a tag']"
              item-value="text"
            ></v-select>
            <p>{{selectTagState}}</p>
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
      tags() {
        return this.$store.state.tags
      }
    },
    methods: {
      selectTagStateChange(payload) {
        this.$store.commit('selectTagStateChange', payload);
      }
    }
  }
</script>
