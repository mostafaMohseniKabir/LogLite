<template>
  <div>
    <v-app toolbar>
    <v-layout wrap>
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
        <v-list class="pt-0" :style="{'background-color': navbarColor, 'color': color}" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon large>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <router-link :to="item.link">
            <v-list-tile-content style="color:#ffffff">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            </router-link>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

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
        drawer: false,
        right: null,
        items: [
            { title: 'Dynamic Log', icon: 'list', link: '/'},
            { title: 'Static Log', icon:'present_to_all', link: '/StaticLog' },
            { title: 'Overview', icon: 'list', link: '/Overview'},
            { title: 'Setting', icon: 'build', link: '/Setting'}
          ],
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
</style>
