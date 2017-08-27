<template>
  <v-app
    height="415px"
    dark
    id="e3"
    standalone
  >
    <v-navigation-drawer
      class="pb-0"
      persistent
      absolute
      height="100%"
      clipped
      enable-resize-watcher
      v-model="drawer"
    >

      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <router-link :to=item.link>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
            </router-link>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar class="red">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="ml-3">youtube</v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <main>
      <v-container>
        <v-layout>
          <v-flex xs12>
              <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>


<script>

  export default {
    data: () => ({
      drawer: true,
      items: [
        { icon: 'edit', text: 'LogEntry', link: '/' },
        { icon: 'list', text: 'Overview', link: '/Overview' }
      ]
    })
  }
</script>


<style scoped>
  #e3, #e3 .container {
    min-height: 700px;
    overflow: hidden;
    z-index: 0;
  }

  #e3 .input-group__details:after {
    background-color: rgba(255,255,255,0.32) !important;
  }

  #e3 .input-group--focused .input-group__append-icon {
    color: inherit !important;
  }
</style>

<style lang="stylus">
  @import './stylus/main'
</style>
