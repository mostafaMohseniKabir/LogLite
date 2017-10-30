


<template>
  <div>
  <v-app toolbar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :style="{'background-color': navbarColor}"
      light
      overflow
    >
    <!-- application intro in drawer -->
    <v-list class="pa-1" :style="{'background-color': navbarColor, 'color': color}">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="../public/photo_2017-08-30_15-36-52.jpg" />
        </v-list-tile-avatar>
        <v-list-tile-content style="color:#ffffff">
          <v-list-tile-title>Weblite</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <!-- list in navigation drawer -->
    <v-list :style="{'background-color': navbarColor, 'color': color}">
      <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
        <v-list-tile slot="item" @click="">
          <v-list-tile-action>
            <v-icon large>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content style="color:#ffffff">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon style="color:#ffffff">keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.subItems" v-bind:key="subItem.title" :style="{'background-color': navbarColor, 'color': color}">
          <router-link :to="subItem.link">
            <v-list-tile-content style="color:#ffffff">
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
    <v-toolbar class="elevation-12" :style="{'background-color': toolbarColor}">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Log Lite</v-toolbar-title>
      <div v-show="!readonly" style="margin-left:auto; margin-right:0">
        <el-rate
          v-model="rating"
          @change="rateChanged = true"
          :colors="['#1F2D3D', '#1F2D3D', '#000000']"
          void-color="['#1F2D3D', '#1F2D3D', '#1F2D3D']"
          style="margin-left:10px">
        </el-rate>
      </div>
      <div v-show="readonly" style="margin-left:auto; margin-right:5px">
        <el-rate
          v-model="rated"
          void-color="['#1F2D3D', '#1F2D3D', '#1F2D3D']"
          disabled
          show-text
          text-color="#1F2D3D"
          text-template="Thanks!:)"
          style="margin-left:10px">
        </el-rate>
      </div>
      <div v-show="!readonly && rateChanged">
        <el-button style="color: #1F2D3D" type="text" @click="ratingToRated">Rate it!</el-button>
      </div>
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
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
        color: '#ffffff',
        rating: null,
        rated: null,
        readonly: false,
        rateChanged: false,
        drawer: null,
        right: null,
        items: [
              { title: 'Enter Log', icon:'present_to_all', subItems: [{title: 'Static',icon:'', link: '/' }, {title: 'Dynamic', icon:'', link: '/Dynamic'}]},
              { title: 'Overview', icon: 'list', subItems: [{title: 'Log List',icon:'', link: '/Overview/LogList'}, {title: 'Statistics',icon:'', link: '/Overview/Statistics'}]},
              { title: 'Setting', icon: 'build', subItems: [{title: 'Color',icon:'', link: '/Setting/Setting'}]}
            ]
      }
    },
    mounted: function() {
      this.$nextTick(function () {
        this.$store.dispatch('fetchLogsInfo')
      })
    },
    computed: {
      ...mapState([
        'navbarColor',
        'toolbarColor',
      ])
    },
    methods: {
      ratingToRated() {
        this.rated = this.rating;
        this.readonly = true;
        return
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
