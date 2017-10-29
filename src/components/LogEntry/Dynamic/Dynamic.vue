<template>
  <div>
        <el-carousel :autoplay=false trigger="click" height="200px" @change="next">
          <el-carousel-item v-for="item in 2" :key="item">
            <app-stopWatch v-if="item === 1"></app-stopWatch>
            <template v-else>
              <el-row>
                <el-col class="components">
                  <app-logInfo></app-logInfo>
                  <el-button @click="submitLogInfo(true)" icon="plus" style="color: #000000; background-color: #ffb000">Add</el-button>
                </el-col>
              </el-row>
            </template>
          </el-carousel-item>
        </el-carousel>
        <app-submit-snackbar></app-submit-snackbar>

        <el-steps style="margin:5px 5px" center :active="active" >
          <el-step title="Time" icon="time"></el-step>
          <el-step title="Tags" icon="document"></el-step>
        </el-steps>
  </div>
</template>




<script>
  import StopWatch from './StopWatch.vue';
  import LogInfo from '../common/LogInfo.vue';
  import SubmitSnackbar from '../common/SubmitSnackbar.vue';
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        active: 0
      }
    },
    components: {
      'app-logInfo': LogInfo,
      'app-stopWatch': StopWatch,
      'app-submit-snackbar': SubmitSnackbar
    },
    computed: {
    },
    methods: {
      ...mapMutations([
        'submitLogInfo',
      ]),
      next() {
        if (this.active++ > 1) this.active = 1;
      },
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #1F2D3D;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #475669;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #324057;
  }

  .components {
    text-align: center;
    margin-top: 85px;
  }
</style>
