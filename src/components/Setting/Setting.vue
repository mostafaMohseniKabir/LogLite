<template>
  <el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5> Choose Toolbar Color!</h5>
        <el-color-picker :value="toolbarColor" @input="toolbarColorChange" style="float: right" show-alpha></el-color-picker>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5> Choose Navbar Color!</h5>
        <el-color-picker :value="navbarColor" @input="navbarColorChange" style="float: right" show-alpha></el-color-picker>
      </div>
    </el-card>
  </el-row>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';
  export default {
    computed: {
      ...mapState([
        'toolbarColor',
        'navbarColor',
      ]),
    },
    methods: {
      ...mapMutations([
        'toolbarColorChange',
        'navbarColorChange',
      ]),
    }
  }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
