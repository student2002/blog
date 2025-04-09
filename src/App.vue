<template>
  <router-view />
  <el-backtop :right="50" :bottom="100">
    <el-icon>
      <Top />
    </el-icon>
  </el-backtop>
  <BottomAssembly />

</template>
<script setup>
import BottomAssembly from '@/components/BottomAssembly.vue'


</script>
<style lang="scss">
@import '@/global/index.css';

html.body {
  margin: 0;
  padding: 0%;
  overflow-x: hidden;
}

.maxWidthView {
  max-width: 1200px;
  margin: 0 auto;
}

.zoomIn {
  animation: zoomIn 1s both
}


// 首页动画
@keyframes zoomIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  50% {
    opacity: 1
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
