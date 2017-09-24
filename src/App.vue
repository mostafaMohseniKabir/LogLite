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
            <v-list-tile-title>Log Lite</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <router-link :to="item.link">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="deep-orange" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'LogEntry', icon: 'edit', link: '/' },
          { title: 'Overview', icon: 'list', link: '/Overview' }
        ],
        right: null
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
