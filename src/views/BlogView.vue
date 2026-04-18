<template>
  <div class="navigation-wrapper">
    <div class="Navigation">
      <div class="Navigation-box maxWidthView flex hidden-xs-only">
        <div class="logo-container" @click="indexPageEvent('/', 0)">
          <span class="logo-text">Muffin</span>
          <span class="logo-dot">.</span>
          <span class="logo-sub">Blog</span>
        </div>
        <el-row justify="end" class="flex_equally">
          <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
            <ul class="flex nav right_elastic">
              <li 
                v-for="(item, index) in menu" 
                :key="index" 
                :class="{ 'active': activeIndex === index }"
                @click="indexPageEvent(item.path, index)"
              >
                <i></i>
                <span class="nav-text">{{ item.name }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div class="flex center hidden-sm-and-up sm-phone">
        <div class="logo-mobile" @click="indexPageEvent('/', 0)">Muffin.Blog</div>
        <div class="Expand flex center" @click="drawer = !drawer">
          <el-icon>
            <Expand />
          </el-icon>
        </div>
      </div>
    </div>
    <el-drawer 
      v-model="drawer" 
      :with-header="false" 
      size="280px"
      direction="rtl"
      class="mobile-drawer"
    >
      <div class="drawer-header">
        <span class="drawer-logo">Muffin.Blog</span>
      </div>
      <ul class="menu-phone">
        <li 
          v-for="(item, index) in menu" 
          :key="index" 
          :class="{ 'active': activeIndex === index }"
          @click="indexPageEvent(item.path, index)"
        >
          <i></i>
          <span>{{ item.name }}</span>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        </li>
      </ul>
    </el-drawer>

    <!-- 二级路由切换 -->
    <div class="route-container adapt_box" :style="{ minHeight: getViewHeight + 'px' }">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>


<script setup>
import router from '@/Composition/router'
import common from '@/utils/common'
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'

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
  }
]

if (router.query().index) {
  activeIndex.value = +router.query().index
} else {
  setTimeout(() => {
    activeIndex.value = 1
  });
}

const getViewHeight = common.getViewPortHeight();

const indexPageEvent = (page, index) => {
  activeIndex.value = index
  drawer.value = false
  router.get().push(page)
}
</script>

<style lang="scss" scoped>
.navigation-wrapper {
  min-height: 100vh;
}

.Navigation {
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  .Navigation-box {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;

    .logo-container {
      cursor: pointer;
      display: flex;
      align-items: baseline;
      margin-right: 40px;
      transition: opacity 0.3s;
      
      &:hover {
        opacity: 0.8;
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .logo-dot {
        font-size: 24px;
        font-weight: 700;
        color: #764ba2;
      }

      .logo-sub {
        font-size: 16px;
        font-weight: 500;
        color: #666;
        margin-left: 2px;
      }
    }

    .nav {
      height: 100%;
      font-size: 15px;

      li {
        padding: 0 24px;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;

        i {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0%;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transform: translateX(-50%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 3px 3px 0 0;
        }

        .nav-text {
          position: relative;
          z-index: 1;
          transition: color 0.3s;
        }

        &:hover {
          .nav-text {
            color: #667eea;
          }
          
          i {
            width: 60%;
          }
        }

        &.active {
          .nav-text {
            color: #667eea;
            font-weight: 600;
          }
          
          i {
            width: 60%;
          }
        }
      }
    }
  }

  .sm-phone {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    justify-content: space-between;

    .logo-mobile {
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      cursor: pointer;
    }

    .Expand {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #f5f5f5;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #667eea;
        color: #fff;
      }
    }
  }
}

// 移动端抽屉样式
::v-deep(.mobile-drawer) {
  .el-drawer__body {
    padding: 0;
    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  }
}

.drawer-header {
  padding: 24px 20px;
  border-bottom: 1px solid #f0f0f0;
  
  .drawer-logo {
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.menu-phone {
  padding: 12px;
  
  li {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    margin: 4px 0;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;

    i {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      height: 3px;
      border-radius: 0 3px 3px 0;
      transition: all 0.3s ease;
    }

    span {
      flex: 1;
      font-size: 15px;
      color: #333;
      transition: color 0.3s;
    }

    .arrow-icon {
      color: #ccc;
      transition: all 0.3s;
    }

    &:hover {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.06) 100%);
      
      span {
        color: #667eea;
      }
      
      .arrow-icon {
        color: #667eea;
        transform: translateX(4px);
      }
    }

    &.active {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.06) 100%);
      
      span {
        color: #667eea;
        font-weight: 600;
      }
      
      .arrow-icon {
        color: #667eea;
      }
      
      i {
        width: 4px;
        border-radius: 2px;
      }
    }
  }
}

// 路由容器
.route-container {
  padding-top: 70px;
  background-color: #f5f5f5;
}

// 页面过渡动画
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 响应式
@media (max-width: 768px) {
  .Navigation {
    height: 60px;
    
    .Navigation-box {
      padding: 0 15px;
    }
  }
  
  .route-container {
    padding-top: 60px;
  }
}
</style>
