<template>
  <div class="bg-box flex center container" :style="{ height: getViewHeight + 'px' }">
    <div class="callout-title">
      <h1>枕风-Blog</h1>
      <p>只要朝着一个方向努力，一切都会变得得心应手</p>
      <el-button type="primary" @click="menuEvent('/BlogList')">Enter Blog</el-button>
    </div>
    <el-icon class="ArrowDownBold">
      <ArrowDownBold @click="ArrowDownBoldEvent" />
    </el-icon>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
    <span class="meteor"></span>
  </div>
  <div class="hover_animation menu_open" :class="{ menu_close: mark }" @click="mark = !mark">
    <span :style="{ marginTop: mark ? '18px' : '' }"></span>
    <span></span>
    <span></span>
  </div>
  <div class="navgation" :class="[mark ? 'navgation_open' : 'navgation_close']" @touchmove.prevent>
    <div class="menu-list" v-show="mark">
      <div class="index">作者<i></i></div>
      <div class="index" @click="menuEvent('/BlogList')">博客<i></i></div>
      <div class="index" @click="menuEvent('/LeaveOneMsg?index=2')">留言<i></i></div>
    </div>
  </div>

  <div style="background-color: #f5f5f5">
    <div class="maxWidthView classification adapt_box">
      <div :style="{
        'animationDelay': '0.2s',
        'visibility': page1AnimationType ? 'visible' : 'hidden',
        'animationName': page1AnimationType ? 'fadeInDown' : 'none',
      }" class=" fadeInDown  " :class="{ 'animated': page1AnimationType }">
        <h1 class="title">博客分类</h1>
        <p class="Subtitle">只要朝着一个方向努力一切都会变得得心应手</p>
      </div>
      <div class="classification-box adapt_box">
        <el-row :gutter="20">
          <!-- <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3" v-for="i in 3" :key="i">
            <div class="fadeInUp">
              <img src="https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                alt="" style="width: 100%" />
              <div class="news-content">
                <h4>Vue专栏</h4>
                <div class="date">2023年1月20日</div>
                <p>
                  本专栏主要分享vue的各种常见问题，包括vue学习路线，vue基础，
                  模块化，整体项目结构优化方案，项目，面试题，希望通过这些知识的分享能够提升自己的vue水平
                </p>
                <span class="see" @click="menuEvent('/BlogList')">更多阅读</span>
              </div>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>
    <div class="about">
      <el-row :gutter="40" justify="center">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="about-box">
            <el-row :gutter="40">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="flex center links-box">
                  <div class="links fadeInLeft " :style="{
                    'visibility': page2AnimationType ? 'visible' : 'hidden',
                    'animationName': page2AnimationType ? 'fadeInLeft' : 'none',
                  }" :class="{ 'animated': page2AnimationType }">关于</div>
                  <div class="after"></div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="flex center links-box">
                  <div class="links fadeInRight" :style="{
                    'visibility': page2AnimationType ? 'visible' : 'hidden',
                    'animationName': page2AnimationType ? 'fadeInRight' : 'none',
                  }" :class="{ 'animated': page2AnimationType }">+友情链接</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="personal">
      <div class="title fadeInLeft" :style="{
        'visibility': page3AnimationType ? 'visible' : 'hidden',
        'animationName': page3AnimationType ? 'fadeInLeft' : 'none',
      }" :class="{ 'animated': page3AnimationType }">枕风个人博客</div>
      <div class="Subtitle fadeInRight" :style="{
        'visibility': page3AnimationType ? 'visible' : 'hidden',
        'animationName': page3AnimationType ? 'fadeInRight' : 'none',
      }" :class="{ 'animated': page3AnimationType }">一天很短，开心了就笑，不开心了就过会儿再笑。</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import common from '@/utils/common'
import router from '@/Composition/router'
const mark = ref(false);

const menuEvent = (url) => {
  router.get().push(url)
};
const getViewHeight = common.getViewPortHeight();

let animationTime = null; // 动画计时器
let page1AnimationType = ref(false); // 动画1
let page2AnimationType = ref(false); // 动画2
let page3AnimationType = ref(false); // 动画3
window.onscroll = function (e) {
  clearTimeout(animationTime)
  animationTime = setTimeout(() => {
    if (window.pageYOffset >= 200 && !page1AnimationType.value) {
      page1AnimationType.value = true
    };
    if (window.pageYOffset >= 1000 && !page2AnimationType.value) {
      page2AnimationType.value = true
    };
    if (window.pageYOffset >= 1150 && !page3AnimationType.value) {
      page3AnimationType.value = true
    };
  }, 100);
};

const ArrowDownBoldEvent = () => {
  let thisScrollTop = document.documentElement.scrollTop;
  setTimeout(() => {
    if (thisScrollTop < getViewHeight) {
      document.documentElement.scrollTop = thisScrollTop + 15
      ArrowDownBoldEvent()
    }
  });
};

</script>

<style lang="scss" scoped>
@import '@/global/meteor.css';
.ArrowDownBold {
  position: absolute;
  left: 0;
  bottom: 20px;
  right: 0;
  margin: 0 auto;
  font-size: 40px;
  cursor: pointer;
  animation: bounce-up 2s 0s alternate infinite;
}


@keyframes bounce-up {
  25% {
    transform: translateY(10px);
  }

  50%,
  100% {
    transform: translateY(0);
  }

  75% {
    transform: translateY(-10px);
  }
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.personal {
  .Subtitle {
    text-align: center;
    font-size: 14px;
  }

  .title {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
  }

  padding: 50px 0;
}

.about {
  .about-box {
    .links-box {
      position: relative;
      margin-bottom: 10px;

      .fadeInRight {
        -webkit-animation-name: fadeInRight;
        animation-name: fadeInRight;
      }

      .fadeInLeft {
        -webkit-animation-name: fadeInLeft;
        animation-name: fadeInLeft;
      }

      .links {
        &:hover {
          border-color: #fff;
          color: #fff;
        }

        width: 200px;
        height: 46px;
        border: 1px solid #b4b4b4;
        color: #ffffff;
        text-align: center;
        line-height: 46px;
        cursor: pointer;
      }
    }

    max-width: 500px;
    margin: 0 auto;
  }

  // background-image: url(https://images.unsplash.com/photo-1551841462-31a28cf2c601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80);
  background-image: url(../assets/bj.jpg);
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  overflow: hidden;
  display: table;
  table-layout: fixed;
  width: 100%;
  position: relative;
  padding: 100px 0;
}

.classification {


  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
  }


  .classification-box {
    .fadeInUp {
      &:hover {
        img {
          transform: scale(1.2);
        }
      }

      img {
        transition: all 0.4s ease;
        height: 244px;
        overflow: hidden;
      }

      background-color: #ffffff;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .news-content {
      .see {
        margin-top: 15px;
        padding: 0;
        background: 0 0;
        border: none;
        color: #1890ff;
        font-size: 14px;
        cursor: pointer;
      }

      p {
        color: #999;
        height: 55px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 19px;
        font-size: 12px;
      }

      .date {
        color: #bbb;
        font-size: 12px;
        margin-bottom: 15px;
      }

      h4 {
        margin-bottom: 10px;
        font-size: 100%;
        margin-top: 0;
        font-weight: 400;
      }

      padding: 30px 15px;
    }

    padding: 0 5px;
    width: 100%;
    overflow-x: hidden;
  }

  .Subtitle {
    color: #888888;
    margin-top: 20px;
    // margin-bottom: 20px;
    line-height: 22px;
    text-align: center;
    padding: 0 5px;
  }

  .title {
    font-size: 30px;
    text-align: center;
  }

  padding: 90px 0;
  margin: 0 auto;
}

.menu-list {
  .index {
    i {
      position: absolute;
      left: 0;
      bottom: 0%;
      margin: auto 0;
      width: 0%;
      height: 3px;
      transition: width 0.5s;
      background-color: #1890ff;
    }

    padding: 10px 50px;
    font-size: 20px;
    color: #686967;
    line-height: 50px;
    position: relative;

    &:hover {
      color: #1890ff;

      i {
        width: 100%;
      }
    }
  }

  position: absolute;
  right: 0;
  top: 200px;
  z-index: 100;
  // width: 100px;
  cursor: pointer;
}

.menu_close,
.menu_open {
  position: fixed;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right: 55px;
  top: 40px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 102;
}

.menu_close:hover,
.menu_open:hover {
  background: #1890ff;
}

.menu_close span,
.menu_open span {
  display: block;
  background: #fff;
  width: 26px;
  height: 2px;
  line-height: 10px;
  margin: 0 auto;
  margin-top: 5px;
}

.menu_open span:first-child,
.menu_open span:last-child,
.menu_open span:nth-last-of-type(2) {
  -webkit-transform: rotate(0);
  transform: rotate(0);
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.menu_close span:first-child {
  margin-top: 18px;
}

.menu_close span {
  margin-top: 0;
}

.menu_open span:first-child {
  margin-top: 12px;
}

.menu_close span:last-child {
  display: none;
}

.menu_close span:first-child {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.menu_close span:nth-of-type(2) {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  margin-top: -2px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.hover_animation {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.navgation .logo {
  width: 70px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.navgation,
.navgation_close,
.navgation_open {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
}

.navgation_close {
  height: 0;
}

.navgation_open {
  background: rgba(0, 0, 0, 0.6);
}

.navgation:before,
.navgation_close:before,
.navgation_open:before {
  content: "";
  width: 60%;
  height: 100%;
  background: #fff;
  position: fixed;
  -webkit-transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  -moz-transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  -o-transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-transform: translateZ(0) translateX(45%) skew(-12deg);
  -moz-transform: translateZ(0) translateX(45%) skew(-12deg);
  -ms-transform: translateZ(0) translateX(45%) skew(-12deg);
  -o-transform: translateZ(0) translateX(45%) skew(-12deg);
  transform: translateZ(0) translateX(45%) skew(-12deg);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  content: "";
  top: 0;
  z-index: 11;
  background-color: #fff;
  background-image: -webkit-linear-gradient(46deg, #fff, #f1f2f0);
  background-image: -moz-linear-gradient(46deg, #fff, #f1f2f0);
  background-image: -o-linear-gradient(46deg, #fff, #f1f2f0);
  background-image: linear-gradient(46deg, #fff, #f1f2f0);
}

.navgation_open:before {
  right: 0;
}

.navgation_close:before {
  right: -60%;
}

.point {
  position: absolute;
  right: 0;
  top: 200px;
  z-index: 101;
  font-size: 20px;
}

.point li {
  display: block;
  text-align: right;
  line-height: 80px;
}

.point li a {
  font-family: "Microsoft YaHei";
  color: #686967;
  display: inline-block;
  line-height: 46px;
  padding: 10px 50px;
  font-size: 20px;
  color: #686967;
  text-decoration: none;
  -webkit-transition: color 0.6s linear;
  transition: color 0.6s linear;
  position: relative;
}

.point li a:before {
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
  content: "";
  height: 1px;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 15px;
  right: 105px;
}

.point li a:hover {
  color: #6bc30d;
}

.point li a:hover:before {
  background-color: #6bc30d;
  right: 15px;
}

.navgation_open .point {
  display: block;
}

.navgation_close .point {
  display: none;
}

.logo {
  font-size: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 101;
  padding: 10px 50px;
}

.logo a {
  font-family: BarbaraHand;
  color: #686967;
  text-decoration: none;
}

.navgation_open .logo {
  display: block;
}

.navgation_close .logo {
  display: none;
}

.bg-box {
  background-color: #151515;
  color: #ffffff;
  text-align: center;
  position: relative;
}

@media screen and (max-width: 768px) {

  .navgation:before,
  .navgation_open:before,
  .navgation_close:before {
    width: 50%;
    transform: none;
    -webkit-transform: none;
  }
}

.callout-title {
  animation: expandUp 500ms 0.5s ease-in both;
}

@keyframes expandUp {
  0% {
    opacity: 0;
    transform: translateY(100%) scale(0.6) scaleY(0.5);
  }

  60% {
    -webkit-transform: translateY(-7%) scaleY(1.12);
    opacity: 0.2;
  }

  75% {
    -webkit-transform: translateY(3%);
    opacity: 0.5;
  }

  100% {
    -webkit-transform: translateY(0%) scale(1) scaleY(1);
    opacity: 1;
  }
}
</style>
