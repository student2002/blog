<template>
  <div class="Navigation">
    <div class="Navigation-box maxWidthView flex hidden-xs-only">
      <el-row justify="end" class="flex_equally  ">
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <ul class="flex nav right_elastic">
            <li v-for="(item, index) in menu" :key="index" :class="{ 'active': activeIndex === index }"
              @click="indexPageEvent(item.path, index)"><i></i>{{ item.name }}</li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="flex center hidden-sm-and-up sm-phone ">
      <div class="Expand flex center" @click="drawer = !drawer">
        <el-icon>
          <Expand />
        </el-icon>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false" size="50%">
    <ul class="menu-phone">
      <li class="flex adapt_box" v-for="(item, index) in menu" :key="index" :class="{ 'active': activeIndex === index }"
        @click="indexPageEvent(item.path, index)"><i></i>{{ item.name }}</li>
    </ul>
  </el-drawer>


  <!-- 二级路由切换 重定向 -->
  <div class="adapt_box" style="padding-top: 60px;background-color: #444647;"
    :style="{ minHeight: getViewHeight + 'px' }">
    <router-view />
  </div>
</template>


<script setup>
import router from '@/Composition/router'
import common from '@/utils/common'
import { ref } from 'vue';
const activeIndex = ref();
const drawer = ref(false)

const menu = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '博客',
    path: '/BlogList'
  },
  {
    name: '留言',
    path: '/LeaveOneMsg'
  },
  // {
  //   name:'友链',
  //   path:'/'
  // },
]
if (router.query().index) {
  activeIndex.value = +router.query().index
} else {
  setTimeout(() => {
    activeIndex.value = 1
  });
};
const getViewHeight = common.getViewPortHeight();
const indexPageEvent = (page, index) => {
  activeIndex.value = index
  router.get().push(page)
}

</script>

<style lang="scss" scoped>
.menu-phone {
  // width: 240px;
  .active {
    i {
      width: 100%;
    }
    color: #1890ff;
  }

  li {
    border-bottom: 1px solid #e8e9e7;
    padding: 4px 18px;
    margin: 10px 5px;
    position: relative;
    cursor: pointer;
    i {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0%;
      background-color: #1890ff;
      height: 3px;
      transition: all 0.3s ease-out;
    }

    &:hover {
      i {
        width: 100%;
      }

      color: #1890ff;
    }
  }

  .nav li:before {
    width: 0;
    height: 2px;
    position: absolute;
    bottom: -11px;
    left: 50%;
    background-color: #6bc30d;
    content: "";
    transition: all .6s;
    z-index: -1;
  }
}

.Navigation {
  .sm-phone {
    .Expand {
      position: absolute;
      top: 0;
      right: 40px;
      margin: auto;
      text-align: right;
      height: 100%;
      font-size: 30px;
      color: #333;
      cursor: pointer;
    }

    position: relative;
    width: 100%;
    height: 100%;

    img {
      width: 80px;
    }
  }

  .Navigation-box {
    .nav {
      .active {
        i {
          width: 100%;
        }

        color: #1890ff;
      }

      li {
        i {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          background-color: #1890ff;
          height: 3px;
          transition: all 0.3s ease-out;
        }

        &:hover {
          i {
            width: 100%;
          }

          color: #1890ff;
        }

        padding: 14px 28px;
        margin: 0 5px;
        position: relative;
        cursor: pointer;
      }

      height: 100%;
      font-size: 15px;
    }

    height: 100%;
    margin: 0 auto;
  }

  .logo {
    font-family: Microsoft YaHei;
    color: #444647;
    font-size: 40px;
    width: 70px;
  }

  height: 60px;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
</style>


