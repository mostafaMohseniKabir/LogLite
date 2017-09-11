<template>
  <v-snackbar
    :timeout="timeout"
    :success=true
    :value="snackbarState"
    @input="snackbarStateChange"
  >
    {{ text }}
    <v-btn dark flat @click.native="snackbarStateChange(false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  data () {
    return {
      timeout: 1000,
      text: 'Log Infornation is submitted successfully!'
    }
  },
  computed: {
    ...mapState([
      'snackbarState'
    ])
  },
  methods: {
    ...mapMutations([
      'snackbarStateChange'
    ])
  }
}
</script>
