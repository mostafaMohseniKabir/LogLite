<template>
  <v-snackbar
    :timeout="timeout"
    :error=true
    :value="snackbarForDelete"
    @input="snackbarForDeleteStateChange"
  >
    {{ text }}
    <v-btn dark flat @click.native="snackbarForDeleteStateChange(false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  data () {
    return {
      timeout: 1000,
      text: 'Log Infornation is deleted successfully!'
    }
  },
  computed: {
    ...mapState([
      'snackbarForDelete'
    ])
  },
  methods: {
    ...mapMutations([
      'snackbarForDeleteStateChange'
    ])
  }
}
</script>
