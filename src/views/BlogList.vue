<template>
  
  <div class="list-box">
    <div class="maxWidthView content">
      <div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="16" :md="16" :lg="17" :xl="17">
            <div class="bloglist">
              <div class="article-item zoomIn" v-for="article in articles" :key="article.id">
                <h5 class="title flex_equally">
                  <span class="original">【{{ article.category }}】</span>
                  <span>{{ article.title }}</span>
                  <div class="time">
                    <span class="day">{{ article.day }}</span>
                    <span class="month">{{ article.month }}</span>
                    <span class="year ">{{ article.year }}</span>
                  </div>
                </h5>

                <div class="contents">
                  <img :src="article.image" :alt="article.title">

                  {{ article.summary }}

                </div>
                <div class="read-more">
                  <span @click="detailsPageEvent(article.id)">查看详情</span>
                </div>
                <div class="fc-flag" v-if="article.isTop">
                  置顶
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="7" :xl="7" class="hidden-xs-only">
            <el-affix :offset="60">
              <div class="inner">
              <div class="search">
                <div class="search-wrap flex center">
                  <el-input v-model="input3" placeholder="请输入关键字搜索文章" @keyup.enter="searchArticles" />
                  <el-icon class="search-bot" color="#606266" @click="searchArticles">
                    <Search />
                  </el-icon>
                </div>
              </div>
              <div class="Article-type" >
                <div class="category-header">
                  <h4 class="category-title">文章分类</h4>
                  <p class="category-desc">按类别浏览文章</p>
                </div>
                <ul >
                  <li class="slider" :style="{top:topSum+'px'}"></li>
                  <li v-for="(item,index) in ArticleType" :key="index"
                    @mouseover="selectStyle(index)" @mouseout="outStyle()" @click="filterByCategory(item.name, index)">
                      <div class="category-info">
                        <div class="category-name">
                          <el-icon class="category-icon" v-if="item.name === '全部文章'"><Document /></el-icon>
                          <el-icon class="category-icon" v-else-if="item.name === '技术'"><Cpu /></el-icon>
                          <el-icon class="category-icon" v-else-if="item.name === '生活'"><Coffee /></el-icon>
                          <el-icon class="category-icon" v-else-if="item.name === '杂谈'"><ChatDotRound /></el-icon>
                          <p :class="{ active: currentCategoryIndex === index }">{{item.name}}</p>
                        </div>
                        <span class="category-count">{{item?.name === '全部文章' ? (allArticles.length || 0) : (getCategoryCount(item?.name || '') || 0)}} 篇</span>
                      </div>
                      <div class="category-detail" v-if="currentCategoryIndex === index">
                        <p v-if="item.name === '全部文章'">查看所有文章</p>
                        <p v-else-if="item.name === '技术'">技术分享与学习笔记</p>
                        <p v-else-if="item.name === '生活'">日常生活与感悟</p>
                        <p v-else-if="item.name === '杂谈'">随想与杂感</p>
                      </div>
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
import { ref, onMounted, watch } from "vue";
import { getAllArticles, getCategories } from '@/data/articles.js'
import { Document, Cpu, Coffee, ChatDotRound } from '@element-plus/icons-vue'

const allArticles = ref([]);
const articles = ref([]);
const ArticleType = ref([{ name: '全部文章' }]); // 默认有一个'全部文章'分类
const currentCategoryIndex = ref(0); // 当前选中的分类索引
const input3 = ref('');
const topSum = ref(0); // 初始化为0，默认选中第一个分类

onMounted(() => {
  allArticles.value = getAllArticles();
  articles.value = allArticles.value;
  // 将分类字符串数组转换为对象数组
  const categories = getCategories();
  ArticleType.value = categories.map(name => ({ name }));
});

// 根据分类筛选文章
const filterByCategory = (categoryName, index) => {
  currentCategoryIndex.value = index;
  updateSliderPosition(index);
  
  if (categoryName === '全部文章') {
    articles.value = allArticles.value;
  } else {
    articles.value = allArticles.value.filter(article => article.category === categoryName);
  }
  
  // 如果有搜索关键词，应用搜索过滤
  if (input3.value.trim()) {
    applySearchFilter();
  }
};

// 搜索文章
const searchArticles = () => {
  // 重置分类为"全部文章"
  currentCategoryIndex.value = 0;
  updateSliderPosition(0);
  
  // 先显示所有文章
  articles.value = allArticles.value;
  
  // 应用搜索过滤
  applySearchFilter();
};

// 应用搜索过滤
const applySearchFilter = () => {
  const keyword = input3.value.trim();
  if (!keyword) {
    // 如果没有关键词，根据当前选中的分类显示文章
    if (currentCategoryIndex.value === 0) {
      articles.value = allArticles.value;
    } else {
      const categoryName = ArticleType.value[currentCategoryIndex.value].name;
      articles.value = allArticles.value.filter(article => article.category === categoryName);
    }
    return;
  }
  
  // 根据关键词过滤文章
  articles.value = articles.value.filter(article => 
    article.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

// 监听搜索输入框的变化
watch(input3, (newValue) => {
  if (!newValue.trim()) {
    // 如果搜索框为空，根据当前选中的分类显示文章
    if (currentCategoryIndex.value === 0) {
      articles.value = allArticles.value;
    } else {
      const categoryName = ArticleType.value[currentCategoryIndex.value].name;
      articles.value = allArticles.value.filter(article => article.category === categoryName);
    }
  }
});

// 更新滑块位置
const updateSliderPosition = (index) => {
  // 计算滑块位置，考虑每个分类项的高度
  let position = 0;
  for (let i = 0; i < index; i++) {
    // 基础高度39px + 如果是当前选中项则加上详情区域的高度
    position += 39 + (currentCategoryIndex.value === i ? 35 : 0);
  }
  topSum.value = position;
};

// 获取分类下的文章数量
const getCategoryCount = (categoryName) => {
  return allArticles.value.filter(article => article.category === categoryName).length;
};

const selectStyle = (index)=>{
  updateSliderPosition(index);
}
const outStyle = ()=>{
  updateSliderPosition(currentCategoryIndex.value); // 恢复到当前选中分类的位置
}
const detailsPageEvent = (id)=>{
  router.get().push('/details?id=' + id)
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
    .category-header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
      
      .category-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin: 0 0 5px 0;
      }
      
      .category-desc {
        font-size: 14px;
        color: #666;
        margin: 0;
      }
    }
    
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
      .category-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 39px;
        border-bottom: 1px solid #f8f9f7;
        
        .category-name {
          display: flex;
          align-items: center;
          
          .category-icon {
            margin-right: 8px;
            color: #787977;
            font-size: 16px;
          }
          
          p {
            color: #787977;
            margin: 0;
            transition: none;
            text-decoration: none;
            
            &.active {
              color: #1890ff;
              font-weight: bold;
            }
          }
        }
        
        .category-count {
          background-color: #f0f0f0;
          color: #666;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 10px;
        }
      }
      
      .category-detail {
        padding: 8px 20px 12px;
        border-bottom: 1px solid #f8f9f7;
        background-color: #f9f9f9;
        
        p {
          font-size: 13px;
          color: #666;
          margin: 0;
          font-style: italic;
        }
      }

      display: block;
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


