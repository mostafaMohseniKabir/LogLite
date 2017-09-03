<template>
  <div>

    <v-layout>
      <v-flex>
        <slot name="filterTag"></slot>
      </v-flex>
      <v-flex>
        <slot name="filterDay"></slot>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>

        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {


  }
}
</script>
