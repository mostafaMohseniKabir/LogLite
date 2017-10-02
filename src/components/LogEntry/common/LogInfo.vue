<template>
      <v-container fluid grid-list-md text-xs-center class="ma-0 pa-0">
        <v-layout row wrap>
          <v-flex>
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
                <v-list-tile v-for="tag in searchInTagsInventory" :key="tag" @click="chooseTagFromMenu(tag)">
                  <v-list-tile-title>{{ tag }}</v-list-tile-title>
              </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-container>
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
      'searchInTagsInventory'
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
