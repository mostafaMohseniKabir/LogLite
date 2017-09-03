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
  export default {
    data () {
      return {
        timeout: 2000,
        text: 'Log Infornation is submitted successfully!'
      }
    },
    computed: {
      snackbarState() {
        return this.$store.state.snackbarState
      }
    },
    methods: {
      snackbarStateChange(payload) {
        this.$store.commit('snackbarStateChange', payload);
      }
    }
  }
</script>
