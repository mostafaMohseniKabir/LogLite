<template>
  <div>
        <el-carousel :autoplay=false trigger="click" height="200px" @change="next" :next="next">
          <el-carousel-item v-for="item in 2" :key="item">
            <template v-if="item === 1">
              <el-row>
                <el-col class="stopwatch">
                  <app-stopWatch></app-stopWatch>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-row>
                <el-col class="components">
                  <app-logInfo></app-logInfo>
                  <el-button @click="handleSubmit()" icon="d-arrow-right" style="color: #000000; background-color: #ffb000">
                    Finish<i class="el-icon-right"></i></el-button>
                </el-col>
              </el-row>
            </template>
          </el-carousel-item>
        </el-carousel>

        <el-steps style="margin:5px 5px" center :active="active" >
          <el-step title="Time" icon="time"></el-step>
          <el-step title="Tags" icon="document"></el-step>
        </el-steps>
  </div>
</template>

<script>
  import StopWatch from './StopWatch.vue';
  import LogInfo from '../common/LogInfo.vue';
  export default {
    data() {
      return {
        active: 0
      }
    },
    components: {
      'app-logInfo': LogInfo,
      'app-stopWatch': StopWatch,
    },
    methods: {
      next() {
        if (this.active++ > 1) this.active = 1;
      },
      handleSubmit() {
        this.$notify.success({
          title: 'Success',
          message: 'submitted successfully!',
          // offset: 200,
          duration: 1500,
        });
        this.$store.commit('submitLogInfo');
      }
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

   .stopwatch {
     text-align: center;
   }
</style>
