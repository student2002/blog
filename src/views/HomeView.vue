<template>
  <div class="bg-box flex center container" :style="{ height: getViewHeight + 'px' }">
    <!-- 视频背景层 -->
    <video class="bg-video" autoplay muted loop>
      <source :src="bgVideoSource" type="video/mp4">
    </video>
    
    <!-- 半透明遮罩层，降低视频亮度 -->
    <div class="video-overlay"></div>
    
    <!-- 烟花特效层 -->
    <canvas id="fireworksCanvas" class="fireworks-canvas"></canvas>
    
    <!-- 内容层 -->
    <div class="content-overlay">
      <div class="callout-title">
        <h1>muffin-Blog</h1>
        <p>只要朝着一个方向努力，一切都会变得得心应手</p>
      </div>
      <div class="countdown-container">
        <h2 class="countdown-title">距离2026年还有</h2>
        <div class="countdown">
          <div class="countdown-item">
            <div class="countdown-number">{{ countdownDays }}</div>
            <div class="countdown-label">天</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number">{{ countdownHours }}</div>
            <div class="countdown-label">时</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number">{{ countdownMinutes }}</div>
            <div class="countdown-label">分</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number">{{ countdownSeconds }}</div>
            <div class="countdown-label">秒</div>
          </div>
        </div>
      </div>
      <el-icon class="ArrowDownBold">
        <ArrowDownBold @click="ArrowDownBoldEvent" />
      </el-icon>
    </div>
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
          <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3" v-for="(category, index) in categories" :key="index">
            <div class="fadeInUp">
              <img :src="getCategoryImage(category.name)"
                alt="" style="width: 100%" />
              <div class="news-content">
                <h4>{{ category.name }}专栏</h4>
                <div class="date">{{ category.date }}</div>
                <p>
                  {{ category.description }}
                </p>
                <span class="see" @click="menuEvent('/BlogList')">更多阅读</span>
              </div>
            </div>
          </el-col>
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
                  }" :class="{ 'animated': page2AnimationType }" @click="openLink('https://github.com/student2002/blog')">关于</div>
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
      }" :class="{ 'animated': page3AnimationType }">muffin个人博客</div>
      <div class="Subtitle fadeInRight" :style="{
        'visibility': page3AnimationType ? 'visible' : 'hidden',
        'animationName': page3AnimationType ? 'fadeInRight' : 'none',
      }" :class="{ 'animated': page3AnimationType }">一天很短，开心了就笑，不开心了就过一会儿再笑。</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import common from '@/utils/common'
import router from '@/Composition/router'

// 导入资源
const homeBannerImage = require('../assets/images/home-banner.jpg');
// 生活专栏背景图片
const lifeImage = require('../assets/images/life.png');
// 技术专栏背景图片
const codeImage = require('../assets/images/code.png');
// 杂谈专栏背景图片
const imagineImage = require('../assets/images/Imagine.jpg');
// 尝试使用require导入视频文件
const bgVideoSource = require('@/assets/videos/bj.webm');

const mark = ref(false);

// 倒计时相关变量
const countdownDays = ref('00');
const countdownHours = ref('00');
const countdownMinutes = ref('00');
const countdownSeconds = ref('00');
let countdownInterval = null;

// 分类数据
const categories = ref([
  {
    name: '生活',
    description: '分享生活中的点点滴滴，记录美好时光，感悟生活真谛。无论是周末的休闲时光，还是日常的所见所闻，都是生活中值得珍藏的片段。',
    date: '2025年10月'
  },
  {
    name: '技术',
    description: '分享技术学习心得和经验，包括前端开发、编程技巧、学习路线等内容。帮助读者提升技术水平，解决技术难题。',
    date: '2025年10月'
  },
  {
    name: '杂谈',
    description: '分享对未来的思考、人生感悟、社会观察等各种话题。在这里可以畅所欲言，分享内心的想法和观点。',
    date: '2025年10月'
  }
]);

// 计算倒计时
const calculateCountdown = () => {
  const now = new Date();
  const targetDate = new Date('2026-01-01T00:00:00');
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownDays.value = days.toString().padStart(3, '0');
    countdownHours.value = hours.toString().padStart(2, '0');
    countdownMinutes.value = minutes.toString().padStart(2, '0');
    countdownSeconds.value = seconds.toString().padStart(2, '0');
  } else {
    countdownDays.value = '000';
    countdownHours.value = '00';
    countdownMinutes.value = '00';
    countdownSeconds.value = '00';
  }
};

const menuEvent = (url) => {
  router.get().push(url)
};

const openLink = (url) => {
  window.open(url, '_blank');
};

// 根据分类名称获取对应的背景图片
const getCategoryImage = (categoryName) => {
  switch(categoryName) {
    case '生活':
      return lifeImage;
    case '技术':
      return codeImage;
    case '杂谈':
      return imagineImage;
    default:
      return homeBannerImage;
  }
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

// 烟花特效相关代码
let canvas, ctx;
let cw, ch;
let fireworks = [];
let particles = [];
let hue = 120;
let limiterTotal = 15;
let limiterTick = 0;
let timerTotal = 100;
let timerTick = 0;
let mousedown = false;
let mx, my;
let animationFrameId = null;

// 生成范围内的随机数
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// 计算两点距离
function calculateDistance(p1x, p1y, p2x, p2y) {
  let xDistance = p1x - p2x;
  let yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// 烟花弹类
class Firework {
  constructor(sx, sy, tx, ty) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.tx = tx;
    this.ty = ty;
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    
    this.coordinates = [];
    this.coordinateCount = 3;
    while(this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 1.2;
    this.acceleration = 1.03;
    this.brightness = random(50, 70);
    this.targetRadius = 1;
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    if(this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }

    this.speed *= this.acceleration;

    let vx = Math.cos(this.angle) * this.speed;
    let vy = Math.sin(this.angle) * this.speed;
    
    this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

    if(this.distanceTraveled >= this.distanceToTarget) {
      createParticles(this.tx, this.ty);
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
    ctx.stroke();
  }
}

// 粒子类
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.coordinates = [];
    this.coordinateCount = 5;
    while(this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    
    this.angle = random(0, Math.PI * 2);
    this.speed = random(3, 15); // 增加粒子速度，让烟花扩散范围更大
    this.friction = 0.93; // 降低摩擦力，让粒子飞得更远
    this.gravity = 0.8; // 降低重力，延长粒子上升时间
    
    this.hue = random(hue - 50, hue + 50);
    this.brightness = random(50, 80);
    this.alpha = 1;
    this.decay = random(0.01, 0.02); // 降低衰减速度，延长粒子生命周期
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    this.alpha -= this.decay;

    if(this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    ctx.stroke();
  }
}

function createParticles(x, y) {
  let particleCount = 60; // 增加粒子数量，让烟花更大
  while(particleCount--) {
    particles.push(new Particle(x, y));
  }
}

// 主循环
function loop() {
  animationFrameId = requestAnimationFrame(loop);

  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, cw, ch);

  ctx.globalCompositeOperation = 'lighter';

  let i = fireworks.length;
  while(i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  let j = particles.length;
  while(j--) {
    particles[j].draw();
    particles[j].update(j);
  }

  // 自动发射逻辑
  if(timerTick >= timerTotal) {
    if(!mousedown) {
      // 每次发射2-3个烟花
      const fireworkCount = Math.floor(random(2, 4));
      for(let i = 0; i < fireworkCount; i++) {
        let startX = random(cw * 0.1, cw * 0.9); 
        let targetY = random(ch * 0.1, ch * 0.4); 
        fireworks.push( new Firework(startX, ch, startX, targetY) );
      }
      
      // 缩短发射间隔
      timerTotal = random(60, 100);
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  // 限制鼠标点击发射的频率
  if(limiterTick >= limiterTotal) {
    if(mousedown) {
      // 点击时发射2个烟花
      fireworks.push( new Firework(mx, ch, mx, my) );
      // 增加一个随机位置的烟花
      let randomX = random(cw * 0.1, cw * 0.9);
      fireworks.push( new Firework(randomX, ch, randomX, my) );
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }

  hue += 0.5;
}

// 初始化烟花特效
const initFireworks = () => {
  canvas = document.getElementById('fireworksCanvas');
  ctx = canvas.getContext('2d');
  
  // 设置画布尺寸
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas.width = cw;
  canvas.height = ch;
  
  // 窗口大小改变时重置画布
  window.addEventListener('resize', function() {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
  });
  
  // 事件监听
  canvas.addEventListener('mousedown', function(e) {
    e.preventDefault();
    mousedown = true;
    mx = e.pageX - canvas.offsetLeft;
    my = e.pageY - canvas.offsetTop;
  });
  
  canvas.addEventListener('mouseup', function(e) {
    e.preventDefault();
    mousedown = false;
  });
  
  canvas.addEventListener('mousemove', function(e) {
    mx = e.pageX - canvas.offsetLeft;
    my = e.pageY - canvas.offsetTop;
  });
  
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    mousedown = true;
    mx = e.touches[0].pageX - canvas.offsetLeft;
    my = e.touches[0].pageY - canvas.offsetTop;
  });
  
  canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    mousedown = false;
  });
  
  // 启动主循环
  loop();
};

// 组件挂载时启动倒计时和烟花特效
onMounted(() => {
  calculateCountdown();
  countdownInterval = setInterval(calculateCountdown, 1000);
  initFireworks();
});

// 组件卸载时清除倒计时和烟花特效
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

</script>

<style lang="scss" scoped>
// 烟花特效样式
.fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}

// 视频遮罩层样式，用于降低视频亮度
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 4;
  pointer-events: none;
}

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
  background-image: url(../assets/images/home-banner.jpg);
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
        line-clamp: 3;
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

/* 倒计时样式 */
.countdown-container {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
}

.countdown-title {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.countdown {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-number {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.countdown-label {
  color: #fff;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .countdown-container {
    bottom: 100px;
  }
  
  .countdown-title {
    font-size: 20px;
  }
  
  .countdown {
    gap: 15px;
  }
  
  .countdown-number {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }
  
  .countdown-label {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .countdown-container {
    bottom: 80px;
  }
  
  .countdown-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .countdown {
    gap: 10px;
  }
  
  .countdown-number {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  
  .countdown-label {
    font-size: 12px;
  }
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.countdown-number {
  animation: pulse 2s infinite;
}

/* 倒计时容器动画 */
.countdown-container {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.bg-box {
  background-color: #151515;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 视频背景样式 */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保视频覆盖整个容器 */
  z-index: 1; /* 设置为最底层 */
}

/* 内容覆盖层样式 */
.content-overlay {
  position: relative;
  z-index: 10; /* 确保内容在视频之上 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
