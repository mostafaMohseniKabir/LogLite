<template>
  <v-tabs dark fixed icons centered>
    <v-tabs-bar slot="activators" class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="#tab-1">
        <v-icon>watch</v-icon>
        Static
      </v-tabs-item>
      <v-tabs-item href="#tab-2">
        <v-icon>watch_later</v-icon>
        Dynamic
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content
      :key="1"
      :id="'tab-' + 1"
    >
      <v-card flat>
        <app-static></app-static>
      </v-card>
    </v-tabs-content>

    <v-tabs-content
      :key="2"
      :id="'tab-' + 2"
    >
      <v-card flat>
        <app-dynamic></app-dynamic>
      </v-card>
    </v-tabs-content>


  </v-tabs>
</template>


    <script>
      import Dynamic from './Dynamic/Dynamic.vue';
      import Static from './Static/Static.vue';
      export default {
        data () {
          return {
          }
        },
        components: {
          'app-dynamic': Dynamic,
          'app-static': Static
        }
      }
    </script>
