<template>
  <div class="blog-list-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1 class="hero-title fadeInDown">探索与发现</h1>
        <p class="hero-subtitle fadeInUp">记录技术成长，分享生活感悟</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ allArticles.length }}</span>
            <span class="stat-label">篇文章</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ ArticleType.length - 1 }}</span>
            <span class="stat-label">个分类</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ getAllTagsCount() }}</span>
            <span class="stat-label">个标签</span>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L60 52C120 44 240 28 360 22C480 16 600 16 720 20C840 24 960 32 1080 36C1200 40 1320 40 1380 40L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#f5f5f5"/>
        </svg>
      </div>
    </div>
    
    <div class="list-box">
      <div class="maxWidthView content">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="16" :md="16" :lg="17" :xl="17">
            <div class="bloglist">
              <transition-group name="article-list" tag="div">
                <div class="article-item" v-for="article in articles" :key="article.id">
                  <div class="article-image-wrapper">
                    <img :src="article.image" :alt="article.title">
                    <div class="image-overlay"></div>
                    <span class="article-category-tag">{{ article.category }}</span>
                  </div>
                  <div class="article-content">
                    <div class="article-meta">
                      <span class="meta-item">
                        <el-icon><Calendar /></el-icon>
                        {{ article.year }}-{{ article.month }}-{{ article.day }}
                      </span>
                      <span class="meta-item">
                        <el-icon><User /></el-icon>
                        {{ article.author || 'muffin' }}
                      </span>
                    </div>
                    <h5 class="article-title">{{ article.title }}</h5>
                    <p class="article-summary">{{ article.summary }}</p>
                    <div class="article-footer">
                      <div class="article-tags">
                        <span class="tag" v-for="(tag, idx) in article.tags?.slice(0, 3)" :key="idx">{{ tag }}</span>
                      </div>
                      <span class="read-more-btn" @click="detailsPageEvent(article.id)">
                        <span>阅读全文</span>
                        <el-icon><ArrowRight /></el-icon>
                      </span>
                    </div>
                  </div>
                  <div class="fc-flag" v-if="article.isTop">
                    置顶
                  </div>
                </div>
              </transition-group>
              
              <!-- 空状态 -->
              <div class="empty-state" v-if="articles.length === 0">
                <el-icon class="empty-icon"><Document /></el-icon>
                <h4>暂无文章</h4>
                <p>该分类下还没有文章，敬请期待...</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="7" :xl="7" class="hidden-xs-only">
            <el-affix :offset="80">
              <div class="sidebar">
                <!-- 搜索框 -->
                <div class="search-card">
                  <div class="search-box">
                    <el-input 
                      v-model="input3" 
                      placeholder="搜索文章..." 
                      @keyup.enter="searchArticles"
                      :prefix-icon="Search"
                      clearable
                    />
                  </div>
                </div>
                
                <!-- 文章分类 -->
                <div class="category-card">
                  <div class="card-header">
                    <h4 class="card-title">
                      <el-icon><FolderOpened /></el-icon>
                      文章分类
                    </h4>
                  </div>
                  <div class="category-list">
                    <div 
                      class="category-item" 
                      :class="{ active: currentCategoryIndex === index }"
                      v-for="(item, index) in ArticleType" 
                      :key="index"
                      @click="filterByCategory(item.name, index)"
                    >
                      <div class="category-left">
                        <el-icon class="category-icon" v-if="item.name === '全部文章'"><Document /></el-icon>
                        <el-icon class="category-icon" v-else-if="item.name === '技术'"><Cpu /></el-icon>
                        <el-icon class="category-icon" v-else-if="item.name === '生活'"><Coffee /></el-icon>
                        <el-icon class="category-icon" v-else-if="item.name === '杂谈'"><ChatDotRound /></el-icon>
                        <span class="category-name">{{ item.name }}</span>
                      </div>
                      <span class="category-count">{{
                        item?.name === '全部文章' 
                          ? (allArticles.length || 0) 
                          : (getCategoryCount(item?.name || '') || 0)
                      }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- 标签云 -->
                <div class="tags-card">
                  <div class="card-header">
                    <h4 class="card-title">
                      <el-icon><PriceTag /></el-icon>
                      热门标签
                    </h4>
                  </div>
                  <div class="tags-cloud">
                    <span 
                      class="tag-item" 
                      v-for="(tag, index) in getAllTags().slice(0, 10)" 
                      :key="index"
                      @click="searchByTag(tag)"
                    >
                      {{ tag }}
                    </span>
                  </div>
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
import { useRoute } from 'vue-router'
import { getAllArticles, getCategories, getAllTags as fetchAllTags } from '@/data/articles.js'
import { 
  Document, Cpu, Coffee, ChatDotRound, Calendar, User, ArrowRight,
  Search, FolderOpened, PriceTag
} from '@element-plus/icons-vue'

const route = useRoute()
const allArticles = ref([]);
const articles = ref([]);
const ArticleType = ref([{ name: '全部文章' }]);
const currentCategoryIndex = ref(0);
const input3 = ref('');

onMounted(() => {
  allArticles.value = getAllArticles();
  articles.value = allArticles.value;
  const categories = getCategories();
  ArticleType.value = categories.map(name => ({ name }));
  
  // 检查URL参数中是否有分类
  if (route.query.category) {
    const categoryName = decodeURIComponent(route.query.category);
    const index = ArticleType.value.findIndex(item => item.name === categoryName);
    if (index !== -1) {
      filterByCategory(categoryName, index);
    }
  }
});

// 监听路由参数变化
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    const categoryName = decodeURIComponent(newCategory);
    const index = ArticleType.value.findIndex(item => item.name === categoryName);
    if (index !== -1) {
      filterByCategory(categoryName, index);
    }
  } else {
    filterByCategory('全部文章', 0);
  }
});

// 根据分类筛选文章
const filterByCategory = (categoryName, index) => {
  currentCategoryIndex.value = index;
  
  if (categoryName === '全部文章') {
    articles.value = allArticles.value;
  } else {
    articles.value = allArticles.value.filter(article => article.category === categoryName);
  }
  
  if (input3.value.trim()) {
    applySearchFilter();
  }
};

// 搜索文章
const searchArticles = () => {
  currentCategoryIndex.value = 0;
  articles.value = allArticles.value;
  applySearchFilter();
};

// 应用搜索过滤
const applySearchFilter = () => {
  const keyword = input3.value.trim();
  if (!keyword) {
    if (currentCategoryIndex.value === 0) {
      articles.value = allArticles.value;
    } else {
      const categoryName = ArticleType.value[currentCategoryIndex.value].name;
      articles.value = allArticles.value.filter(article => article.category === categoryName);
    }
    return;
  }
  
  articles.value = articles.value.filter(article => 
    article.title.toLowerCase().includes(keyword.toLowerCase()) ||
    article.summary?.toLowerCase().includes(keyword.toLowerCase()) ||
    article.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
  );
};

// 监听搜索输入框的变化
watch(input3, (newValue) => {
  if (!newValue.trim()) {
    if (currentCategoryIndex.value === 0) {
      articles.value = allArticles.value;
    } else {
      const categoryName = ArticleType.value[currentCategoryIndex.value].name;
      articles.value = allArticles.value.filter(article => article.category === categoryName);
    }
  }
});

// 获取分类下的文章数量
const getCategoryCount = (categoryName) => {
  return allArticles.value.filter(article => article.category === categoryName).length;
};

// 获取所有标签
const getAllTags = () => {
  return fetchAllTags();
};

// 获取标签总数
const getAllTagsCount = () => {
  return getAllTags().length;
};

// 根据标签搜索
const searchByTag = (tag) => {
  input3.value = tag;
  currentCategoryIndex.value = 0;
  articles.value = allArticles.value.filter(article => 
    article.tags?.includes(tag)
  );
};

const detailsPageEvent = (id) => {
  router.get().push('/details?id=' + id)
}
</script>



<style lang="scss" scoped>
// 动画
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeInDown {
  animation: fadeInDown 0.6s ease-out;
}

.fadeInUp {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

// Hero Section
.hero-section {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('~@/assets/images/home-banner.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
    margin-top: -20px;
    
    .hero-title {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 12px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .hero-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 30px;
    }
    
    .hero-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .stat-number {
          font-size: 32px;
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }
      }
      
      .stat-divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  
  .hero-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 0;
    
    svg {
      display: block;
      width: 100%;
      height: 40px;
    }
  }
}

// Blog List
.blog-list-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.list-box {
  padding: 20px 0 60px;
  
  .content {
    padding: 0 15px;
    margin: 0 auto;
  }
}

.bloglist {
  .article-item {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.04);
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 48px rgba(102, 126, 234, 0.12), 0 6px 20px rgba(0, 0, 0, 0.08);
      
      .article-image-wrapper {
        img {
          transform: scale(1.05);
        }
        
        .image-overlay {
          background: rgba(0, 0, 0, 0.25);
        }
      }
      
      .read-more-btn {
        color: #667eea;
        
        .el-icon {
          transform: translateX(4px);
        }
      }
    }
    
    .article-image-wrapper {
      position: relative;
      height: 220px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        transition: background 0.4s ease;
      }
      
      .article-category-tag {
        position: absolute;
        top: 16px;
        left: 16px;
        padding: 6px 14px;
        background: rgba(102, 126, 234, 0.9);
        color: #fff;
        font-size: 12px;
        border-radius: 20px;
        z-index: 2;
        backdrop-filter: blur(4px);
        font-weight: 500;
      }
    }
    
    .article-content {
      padding: 24px;
      
      .article-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #999;
          
          .el-icon {
            font-size: 14px;
          }
        }
      }
      
      .article-title {
        font-size: 20px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 12px;
        line-height: 1.4;
        transition: color 0.3s;
        
        &:hover {
          color: #667eea;
        }
      }
      
      .article-summary {
        font-size: 14px;
        line-height: 1.8;
        color: #666;
        margin: 0 0 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      
      .article-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid #f0f0f0;
        
        .article-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          
          .tag {
            padding: 4px 10px;
            background: #f5f5f5;
            color: #666;
            font-size: 12px;
            border-radius: 4px;
            transition: all 0.3s;
            
            &:hover {
              background: rgba(102, 126, 234, 0.08);
              color: #667eea;
            }
          }
        }
        
        .read-more-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #666;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          
          .el-icon {
            transition: transform 0.3s;
          }
        }
      }
    }
    
    .fc-flag {
      position: absolute;
      top: 20px;
      right: -30px;
      width: 120px;
      text-align: center;
      padding: 4px 0;
      background: linear-gradient(90deg, #ff6b6b, #ff8e53);
      color: #fff;
      font-size: 12px;
      transform: rotate(45deg);
      box-shadow: 0 2px 10px rgba(255, 107, 107, 0.4);
    }
  }
  
  .empty-state {
    text-align: center;
    padding: 80px 20px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    
    .empty-icon {
      font-size: 64px;
      color: #d9d9d9;
      margin-bottom: 16px;
    }
    
    h4 {
      font-size: 18px;
      color: #333;
      margin: 0 0 8px;
    }
    
    p {
      font-size: 14px;
      color: #999;
      margin: 0;
    }
  }
}

// 文章列表过渡动画
.article-list-enter-active,
.article-list-leave-active {
  transition: all 0.4s ease;
}

.article-list-enter-from,
.article-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

// Sidebar
.sidebar {
  .search-card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.04);

    .search-box {
      ::v-deep(.el-input__wrapper) {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        border: 1px solid #e8e8e8;
        transition: all 0.3s;

        &:hover, &.is-focus {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
      }
    }
  }

  .category-card, .tags-card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.04);
    
    .card-header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
      
      .card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
        
        .el-icon {
          color: #667eea;
        }
      }
    }
  }
  
  .category-list {
    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      margin: 4px 0;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(102, 126, 234, 0.04);

        .category-name {
          color: #667eea;
        }
      }

      &.active {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.04) 100%);

        .category-name {
          color: #667eea;
          font-weight: 600;
        }

        .category-count {
          background: #667eea;
          color: #fff;
        }
      }
      
      .category-left {
        display: flex;
        align-items: center;
        gap: 10px;
        
        .category-icon {
          font-size: 18px;
          color: #666;
        }
        
        .category-name {
          font-size: 14px;
          color: #333;
          transition: color 0.3s;
        }
      }
      
      .category-count {
        padding: 2px 10px;
        background: #f0f0f0;
        color: #666;
        font-size: 12px;
        border-radius: 10px;
        transition: all 0.3s;
      }
    }
  }
  
  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .tag-item {
      padding: 6px 14px;
      background: #f8f9fa;
      color: #666;
      font-size: 13px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid transparent;

      &:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .hero-section {
    height: 220px;
    
    .hero-content {
      .hero-title {
        font-size: 28px;
      }
      
      .hero-subtitle {
        font-size: 14px;
      }
      
      .hero-stats {
        gap: 20px;
        
        .stat-item {
          .stat-number {
            font-size: 24px;
          }
        }
      }
    }
  }
  
  .bloglist {
    .article-item {
      .article-image-wrapper {
        height: 180px;
      }
      
      .article-content {
        padding: 16px;
        
        .article-title {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
