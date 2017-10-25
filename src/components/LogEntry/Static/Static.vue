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
                <el-button @click="submitLogInfo(true)" type="primary" icon="plus">Add</el-button>
            </el-col>
          </el-row>
        </template>
      </el-carousel-item>
    </el-carousel>
    <app-submit-snackbar></app-submit-snackbar>

    <el-steps center :active="active">
      <el-step title="Step 1" icon="time"></el-step>
      <el-step title="Step 2" icon="date"></el-step>
      <el-step title="Step 3" icon="document"></el-step>
    </el-steps>
  </div>
</template>


<script>
import datePicker from './datePicker.vue';
import startTimePicker from './startTimePicker.vue';
import endTimePicker from './endTimePicker.vue';
import LogInfo from '../common/LogInfo.vue';
import SubmitSnackbar from '../common/SubmitSnackbar.vue';
import { mapMutations } from 'vuex';
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
    'app-submit-snackbar': SubmitSnackbar
  },
  methods: {
    ...mapMutations([
      'submitLogInfo'
    ]),
    next() {
      if (this.active++ > 2) this.active = 1;
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
    background-color: #18ffff;
  }

  .el-carousel__item:nth-child(3n+1) {
    background-color: #64ffda;
  }

  .el-carousel__item:nth-child(3n+2) {
    background-color: #dce775;
  }

  .components {
    text-align: center;
    margin: auto;
    margin-top: 85px;
  }
</style>
