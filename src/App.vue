<template>
  <div>
  <v-app toolbar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      class="blue lighten-3"
      light
      overflow
    >
    <!-- application intro in drawer -->
    <v-list class="pa-1 blue lighten-3">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="../public/photo_2017-08-30_15-36-52.jpg" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Weblite</v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <!-- list in navigation drawer -->
    <v-list class="blue lighten-3">
      <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
        <v-list-tile slot="item" @click="">
          <v-list-tile-action>
            <v-icon large class="blue--text text--darken-2">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile class="blue lighten-3" v-for="subItem in item.subItems" v-bind:key="subItem.title" @click="">
          <router-link :to="subItem.link">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </router-link>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar class="elevation-12 grey lighten-2">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Log Lite</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid class='ma-0 pa-0'>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</div>
</template>


<script>
  export default {
    data () {
      return {
        drawer: null,
        right: null,
        items: [
              { title: 'Enter Log', icon:'present_to_all', subItems: [{title: 'Static',icon:'', link: '/' }, {title: 'Dynamic', icon:'', link: '/Dynamic'}]},
              { title: 'Overview', icon: 'list', subItems: [{title: 'Log List',icon:'', link: '/Overview/LogList'}, {title: 'Statistics',icon:'', link: '/Overview/Statistics'}]}
            ]
      }
    },
    mounted: function() {
      this.$nextTick(function () {
        this.$store.dispatch('fetchLogsInfo')
      })
    },
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
