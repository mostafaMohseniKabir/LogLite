<template>
  <v-app id="example-2" toolbar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      overflow
      absolute
    >

    <v-list class="pa-1">
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


    <v-list>
      <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
        <v-list-tile slot="item" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.subItems" v-bind:key="subItem.title" @click="">
          <router-link :to="subItem.link">
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
          </router-link>
          <v-list-tile-action>
            <v-icon>{{ subItem.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed class="deep-orange" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Log Lite</v-toolbar-title>
    </v-toolbar>
    <main>
        <router-view></router-view>
    </main>
  </v-app>
</template>


<script>
  export default {
    data () {
      return {
        drawer: null,
        right: null,
        items: [
              { title: 'Enter Log', icon:'restaurant', subItems: [{title: 'Static',icon:'restaurant', link: '/' }, {title: 'Dynamic', icon:'restaurant', link: '/Dynamic'}]},
              { title: 'Overview', icon: 'list', subItems: [{title: 'Log List',icon:'restaurant', link: '/Overview/LogList'}, {title: 'Statistics',icon:'restaurant', link: '/Overview/Statistics'}]}
            ]
      }
    },
    mounted: function() {
      console.log('from mounted!')
      this.$nextTick(function () {
        this.$store.dispatch('fetchLogsInfo')
      })
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
