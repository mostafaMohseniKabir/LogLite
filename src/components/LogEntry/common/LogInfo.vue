<template>
  <v-card class="elevation-0">
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
                slot="activator"
              ></v-text-field>

              <v-list>
                <v-list-tile v-for="tag in tagsInventory" :key="tag" @click="chooseTagFromMenu(tag)">
                  <v-list-tile-title>{{ tag }}</v-list-tile-title>
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
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState([
      'inputTagState'
    ]),
    ...mapGetters([
      'tagsInventory'
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
