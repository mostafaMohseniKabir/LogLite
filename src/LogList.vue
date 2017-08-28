<template>
  <div>

    <v-layout>
      <v-flex>
        <app-filter></app-filter>
      </v-flex>
      <v-flex>
        <app-filter></app-filter>
      </v-flex>
    </v-layout>

      <v-card>
        <v-card-title primary-title>
              <h1 class="headline mb-0 orange--text"> {{Tag}} </h1>
              <v-divider></v-divider>
              <h1 class="headline mb-0 orange--text"> {{Time}} </h1>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Delete</v-btn>
          <v-btn flat class="orange--text">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        Tag : 'Meet Lite',
        Time : '10:30 - 12'
      }
    }
  }
</script>
