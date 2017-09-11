<template>
  <v-card class="secondary elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>

            <v-menu offset-x
            transition="slide-x-transition"
            bottom
            right
            >
              <v-text-field
                append-icon="label"
                name="input"
                :value="inputTagState" @input="inputTagStateChange"
                label="Your favorite tag!"
                dark
                slot="activator"
              ></v-text-field>

              <v-list>
                <v-list-tile v-for="tag in tagsInEntry" :key="tag.text" @click="chooseTagFromMenu(tag.text)">
                  <v-list-tile-title>{{ tag.text }}</v-list-tile-title>
              </v-list-tile>
              </v-list>
            </v-menu>

          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    x() {
      console.log(this.tagsInEntry)
      return this.tagsInEntry
    },
    ...mapState([
      'inputTagState',
      'tagsInEntry'
    ])
  },
  methods: {
    ...mapMutations([
      'chooseTagFromMenu',
      'inputTagStateChange'
    ])
  }
}
</script>
