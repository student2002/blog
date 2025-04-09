<template>
  
  <div class="list-box">
    <div class="maxWidthView content">
      <div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="16" :md="16" :lg="17" :xl="17">
            <div class="bloglist">
              <!-- <div class="article-item zoomIn" v-for="i in 4" :key="i">
                <h5 class="title flex_equally">
                  <span class="original">【原创】</span>
                  <span>WEB学习路线推荐</span>
                  <div class="time">
                    <span class="day">24</span>
                    <span class="month">7月</span>
                    <span class="year ">2023</span>
                  </div>
                </h5>

                <div class="contents">
                  <img
                    src="https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                    alt="">

                  这篇文章是为了介绍自己自学用过的WEB视频资料。本套整合教程总共180+G，共450+小时。考虑到绝大部分视频至少要看两遍，而且视频总时长并不代表学习时长，所以零基础初学者总学习时间大约为：600小时视频时长
                  + 100小时理解 +
                  100小时练习，至少需要800小时。你可能觉得自己能一天学习8小时，实际上平均下来每天能学4小时都算厉害了。总会有各种原因，比如当天内容太难，公司聚会，要出差等等。如果周末你也是坚持学习，那么最理想状况下，6个半月就可以学完，达到工作后能被人带的水平。但我知道那其实基本不可能。

                </div>
                <div class="read-more">
                  <span @click="detailsPageEvent">查看详情</span>
                </div>
                <div class="fc-flag">
                  置顶
                </div>
              </div> -->
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="7" :xl="7" class="hidden-xs-only">
            <el-affix :offset="60">
              <div class="inner">
              <div class="search">
                <div class="search-wrap flex center">
                  <el-input v-model="input3" placeholder="请输入关键字搜索文章" />
                  <el-icon class="search-bot" color="#606266">
                    <Search />
                  </el-icon>
                </div>
              </div>
              <div class="Article-type" >
                <ul >
                  <li class="slider" :style="{top:topSum+'px'}"></li>
                  <li v-for="(item,index) in ArticleType" :key="index"
                  @mouseover="selectStyle((index)*40)" @mouseout="outStyle()">
                    <p>{{item.name}}</p>
                  </li>
                </ul>
              </div>
            </div>
            </el-affix>
           
          </el-col>
        </el-row>
      </div>
    
    </div>
  </div>
</template>


<script setup>
import router from '@/Composition/router'
import { ref, } from "vue";
const ArticleType = [
  {
    name:'全部文章',
  },
  // {
  //   name:'Vue专栏',
  // },
  // {
  //   name:'React专栏',
  // },
  // {
  //   name:'node专栏',
  // },
  // {
  //   name:'业务bug',
  // },
  
]
const input3 = ref('');
const topSum = ref('');
const selectStyle = (top)=>{
  topSum.value = top;
}
const outStyle = ()=>{
  topSum.value = '0'
}
const detailsPageEvent = ()=>{
  router.get().push('/details')
}
</script>



<style lang="scss" scoped>
::v-deep .el-input .is-focus {
  box-shadow: 0 0 0 1px #ffffff inset !important;
  outline: none;
}

::v-deep .el-input__wrapper {
  box-shadow: 0 0 0 1px #ffffff inset;

}

::v-deep .el-input__wrapper:hover {
  box-shadow: 0 0 0 1px #ffffff inset;
}

p {
  margin: 0;
  padding: 0;
}

.inner {
  .Article-type {
    .slider {
      border-right: 6px solid #484947;
      height: 40px;
      background-color: #f8f9f7;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 0;
      transition: top .3s;
    }

    ul {
      position: relative;
      cursor: pointer;
    }

    li {
      p {
        color: #787977;
        margin: 0 30px;
        padding: 0 20px;
        height: 39px;
        border-bottom: 1px solid #f8f9f7;
        transition: none;
        text-decoration: none;
      }

      display: block;
      height: 40px;
      line-height: 39px;
      position: relative;
      z-index: 1;
    }

    font-size: 14px;
    background-color: #ffffff;
    padding: 15px 0;
  }

  .search {
    .search-wrap {
      .search-bot {
        padding-left: 10px;
        cursor: pointer;
      }

      height: 40px;
      padding: 0 20px;
      background-color: #fff;
      border-radius: 40px;
      position: relative;
      z-index: 5;
    }

    padding: 20px;
    background-color: grey;
    position: relative;
  }

  margin-top: 20px;
  // background-color: #1890ff;
}

.list-box {
  .content {
    .bloglist {
      .article-item {
        .fc-flag {
          position: absolute;
          height: 20px;
          line-height: 20px;
          text-align: center;
          width: 74px;
          background-color: #ff5722;
          color: #fff;
          transform: rotate(-45deg);
          left: -18px;
          top: 9px;
        }

        .read-more {
          &:before {
            content: " ";
            display: inline-block;
            height: 1px;
            top: 20px;
            left: 100px;
            right: 0;
            position: absolute;
            background-color: #d0d0d0;
          }

          height: 40px;
          line-height: 40px;
          position: relative;
          color: #383937;
          font-weight: 600;
          font-size: 14px;
          text-decoration:underline;

          &:hover {
            color: #1890ff;
            cursor: pointer;
          }
        }

        .contents {
          img {
            display: block;
            width: 300px;
            height: 180px;
            border: 1px solid #e8e9e7;
            overflow: hidden;
            float: left;
            margin-right: 20px;
          }

          font-size: 15px;
          line-height: 28px;
          min-height: 200px;
          margin: 20px 0 0 0;
          color: #515250;
        }



        .title {
          .time {
            .year {
              margin-left: 10px;
            }

            .month,
            .year {
              color: #989997;
            }

            .day {
              display: block;
              text-align: center;
              font-weight: 700;
              font-size: 40px;
              color: #6bc30d;
            }

            line-height: 32px;
            background-color: #fff;
            padding: 0 0 5px 20px;
            position: absolute;
            right: 0;
            top: -11px;
          }

          color: #212220;
          border-bottom: 1px solid #e8e9e7;
          padding: 5px 130px 5px 0;
          line-height: 30px;
          font-size: 18px;
          font-weight: 400;
          position: relative;

          .original {
            color: #2ea7e0;
          }
        }

        padding: 20px 30px 25px 30px;
        background-color: #ffffff;
        margin-top: 20px;
        overflow: hidden;
        position: relative;
      }

    }

    
    padding: 0 5px;
    overflow: hidden;
    margin: 0 auto;
  }

  padding-bottom: 20px;
}


</style>
