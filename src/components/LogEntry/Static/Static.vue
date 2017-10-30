<template>
  <div>
    <el-carousel :autoplay=false trigger="click" height="200px" @change="next">
      <el-carousel-item v-for="item in 3" :key="item">
        <template v-if="item === 1">
          <el-row>
              <el-col class="components">
                <app-startTimePicker></app-startTimePicker>
                <app-endTimePicker></app-endTimePicker>
              </el-col>
          </el-row>
        </template>
        <template v-else-if="item === 2">
          <el-row>
              <el-col class="components">
                <app-datePicker></app-datePicker>
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


    <el-steps style="margin:5px 5px; color: #ffb000" center :active="active">
      <el-step title="Time" icon="time"s></el-step>
      <el-step title="Date" icon="date"></el-step>
      <el-step title="Tags" icon="document"></el-step>
    </el-steps>
  </div>
</template>


<script>
  import datePicker from './datePicker.vue';
  import startTimePicker from './startTimePicker.vue';
  import endTimePicker from './endTimePicker.vue';
  import LogInfo from '../common/LogInfo.vue';
  export default {
    data () {
      return {
        active: 0
      }
    },
    components: {
      'app-datePicker': datePicker,
      'app-startTimePicker': startTimePicker,
      'app-endTimePicker': endTimePicker,
      'app-logInfo': LogInfo,
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 1;
      },
      handleSubmit() {
        this.next();
        this.$notify.success({
          title: 'Success',
          message: 'submitted successfully!',
          offset: 200,
          duration: 1500,
        });
        this.$store.commit('submitLogInfo');
      }
    }
  }
</script>

.<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(3n) {
    background-color: #475669;
  }
  .el-carousel__item:nth-child(3n+1) {
    background-color: #1F2D3D;
  }

  .el-carousel__item:nth-child(3n+2) {
    background-color: #324057;
  }

  .components {
    text-align: center;
    margin: auto;
    margin-top: 85px;
  }
</style>
