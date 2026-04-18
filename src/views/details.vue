<template>
  <div class="article-detail-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="bubble-container">
        <div v-for="i in bubbleCount" :key="i" class="bubble" :style="bubbleStyles[i-1]"></div>
      </div>
    </div>
    
    <div class="maxWidthView inner">
      <!-- 文章不存在状态 -->
      <div v-if="!article" class="article-not-found">
        <el-icon class="not-found-icon"><Document /></el-icon>
        <h3>文章未找到</h3>
        <p>抱歉，您访问的文章不存在或已被删除。</p>
        <el-button type="primary" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回博客列表
        </el-button>
      </div>
      
      <!-- 文章内容 -->
      <article class="article-wrapper" v-else>
        <!-- 文章头部 -->
        <header class="article-header">
          <div class="header-background">
            <img :src="article.image" :alt="article.title" class="header-image">
            <div class="header-overlay"></div>
          </div>
          <div class="header-content">
            <span class="article-category">{{ article.category }}</span>
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-meta">
              <div class="meta-item">
                <el-icon><User /></el-icon>
                <span>{{ article.author || 'muffin' }}</span>
              </div>
              <div class="meta-item">
                <el-icon><Calendar /></el-icon>
                <span>{{ article.date }}</span>
              </div>
              <div class="meta-item">
                <el-icon><View /></el-icon>
                <span>{{ article.views || Math.floor(Math.random() * 1000) + 100 }}</span>
              </div>
            </div>
            <div class="article-tags" v-if="article.tags && article.tags.length">
              <span class="tag" v-for="(tag, idx) in article.tags" :key="idx">{{ tag }}</span>
            </div>
          </div>
        </header>
        
        <!-- 文章主体 -->
        <div class="article-body">
          <div class="content-wrapper" v-html="renderedContent"></div>
          
          <!-- 文章底部 -->
          <footer class="article-footer">
            <div class="copyright-card">
              <div class="copyright-icon">
                <el-icon><Document /></el-icon>
              </div>
              <div class="copyright-content">
                <h4>版权声明</h4>
                <p>非特殊说明，本文版权归 muffin个人博客 所有，转载请注明出处。</p>
                <p>本文标题：{{ article.title }}</p>
                <p>本文网址：<span class="url">{{ currentUrl }}</span></p>
              </div>
            </div>
            
            <!-- 相关文章推荐 -->
            <div class="related-articles" v-if="relatedArticles.length > 0">
              <h3 class="section-title">
                <el-icon><Reading /></el-icon>
                相关推荐
              </h3>
              <div class="related-list">
                <div 
                  class="related-item" 
                  v-for="related in relatedArticles" 
                  :key="related.id"
                  @click="goToArticle(related.id)"
                >
                  <img :src="related.image" :alt="related.title">
                  <div class="related-info">
                    <h5>{{ related.title }}</h5>
                    <span class="related-date">{{ related.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
        
        <!-- 返回按钮 -->
        <div class="back-to-list" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          <span>返回列表</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById, getAllArticles } from '@/data/articles.js'
import MarkdownIt from 'markdown-it'
import { Document, ArrowLeft, User, Calendar, View, Reading } from '@element-plus/icons-vue'

// 初始化markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const route = useRoute()
const router = useRouter()
const article = ref(null)
const relatedArticles = ref([])

// 当前页面URL
const currentUrl = computed(() => {
  return window.location.href
})

// 计算属性获取文章ID
const currentArticleId = computed(() => {
  return route.query.id
})

// 计算属性，将Markdown内容转换为HTML
const renderedContent = computed(() => {
  if (!article.value || !article.value.content) {
    return ''
  }
  
  if (/<[^>]+>/.test(article.value.content)) {
    return article.value.content
  }
  
  return md.render(article.value.content)
})

// 加载文章数据
const loadArticle = () => {
  try {
    const id = currentArticleId.value
    
    if (!id) {
      article.value = null
      return
    }
    
    const articleData = getArticleById(id)
    article.value = articleData
    
    // 获取相关文章（同分类）
    if (articleData) {
      const allArticles = getAllArticles()
      relatedArticles.value = allArticles
        .filter(a => a.category === articleData.category && a.id !== articleData.id)
        .slice(0, 3)
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    article.value = null
  }
}

// 返回博客列表
const goBack = () => {
  router.push('/BlogList')
}

// 跳转到相关文章
const goToArticle = (id) => {
  router.push('/details?id=' + id)
}

// 监听路由参数变化
watch(() => route.query.id, () => {
  loadArticle()
}, { immediate: true })

onMounted(() => {
  loadArticle()
})

// 气泡动画
const bubbleCount = ref(20)
const bubbleStyles = ref([])

onMounted(() => {
  for (let i = 0; i < bubbleCount.value; i++) {
    bubbleStyles.value.push(generateBubbleStyle())
  }
})

const generateBubbleStyle = () => {
  const size = Math.random() * 60 + 20
  const duration = Math.random() * 8 + 4
  const delay = Math.random() * 5
  const x = Math.random() * 100

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  }
}
</script>

<style lang="scss" scoped>
@import '@/global/bubbles.css';

.article-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  position: relative;
  overflow: hidden;
  
  .background-decoration {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
  }
}

.inner {
  position: relative;
  z-index: 1;
  padding: 30px 15px;
}

// 文章不存在
.article-not-found {
  text-align: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 20px;
  max-width: 500px;
  margin: 60px auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  
  .not-found-icon {
    font-size: 80px;
    color: #d9d9d9;
    margin-bottom: 24px;
  }
  
  h3 {
    font-size: 24px;
    color: #333;
    margin: 0 0 12px;
  }
  
  p {
    font-size: 14px;
    color: #999;
    margin: 0 0 24px;
  }
  
  .el-button {
    border-radius: 20px;
    padding: 12px 24px;
  }
}

// 文章包装器
.article-wrapper {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  // 文章头部
  .article-header {
    position: relative;
    padding: 60px 40px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    
    .header-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      
      .header-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
      }
      
      .header-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
      }
    }
    
    .header-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      
      .article-category {
        display: inline-block;
        padding: 6px 16px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(4px);
        border-radius: 20px;
        font-size: 13px;
        margin-bottom: 20px;
      }
      
      .article-title {
        font-size: 32px;
        font-weight: 700;
        line-height: 1.4;
        margin: 0 0 24px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .article-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        margin-bottom: 16px;
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          opacity: 0.9;
          
          .el-icon {
            font-size: 16px;
          }
        }
      }
      
      .article-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        
        .tag {
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          border-radius: 12px;
          font-size: 12px;
        }
      }
    }
  }
  
  // 文章主体
  .article-body {
    padding: 40px;
    
    .content-wrapper {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
      
      // Markdown 样式
      :deep(h1) {
        font-size: 28px;
        font-weight: 700;
        margin: 32px 0 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #f0f0f0;
        color: #1a1a1a;
      }
      
      :deep(h2) {
        font-size: 24px;
        font-weight: 600;
        margin: 28px 0 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #f0f0f0;
        color: #1a1a1a;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }
      }
      
      :deep(h3) {
        font-size: 20px;
        font-weight: 600;
        margin: 24px 0 12px;
        color: #1a1a1a;
      }
      
      :deep(h4) {
        font-size: 18px;
        font-weight: 600;
        margin: 20px 0 10px;
        color: #333;
      }
      
      :deep(p) {
        margin: 16px 0;
        line-height: 1.8;
        text-align: justify;
      }
      
      :deep(ul), :deep(ol) {
        margin: 16px 0;
        padding-left: 32px;
        
        li {
          margin: 8px 0;
          line-height: 1.6;
        }
      }
      
      :deep(blockquote) {
        margin: 24px 0;
        padding: 16px 24px;
        border-left: 4px solid #667eea;
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.06), transparent);
        border-radius: 0 8px 8px 0;
        color: #666;
        font-style: italic;
      }
      
      :deep(code) {
        padding: 3px 8px;
        background: #f5f5f5;
        border-radius: 4px;
        font-family: 'Fira Code', Consolas, Monaco, monospace;
        font-size: 14px;
        color: #e83e8c;
      }
      
      :deep(pre) {
        margin: 24px 0;
        padding: 20px;
        background: #282c34;
        border-radius: 12px;
        overflow-x: auto;
        
        code {
          padding: 0;
          background: transparent;
          color: #abb2bf;
          font-size: 14px;
          line-height: 1.6;
        }
      }
      
      :deep(table) {
        width: 100%;
        border-collapse: collapse;
        margin: 24px 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        
        th, td {
          padding: 12px 16px;
          border: 1px solid #f0f0f0;
          text-align: left;
        }
        
        th {
          background: linear-gradient(135deg, #f5f7fa, #e4e8ec);
          font-weight: 600;
          color: #333;
        }
        
        tr:hover td {
          background: #fafafa;
        }
      }
      
      :deep(a) {
        color: #667eea;
        text-decoration: none;
        border-bottom: 1px dashed #667eea;
        transition: all 0.3s;

        &:hover {
          color: #764ba2;
          border-bottom-style: solid;
        }
      }
      
      :deep(img) {
        max-width: 100%;
        height: auto;
        margin: 24px 0;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
      
      :deep(hr) {
        border: none;
        height: 1px;
        background: linear-gradient(90deg, transparent, #d9d9d9, transparent);
        margin: 32px 0;
      }
    }
    
    // 文章底部
    .article-footer {
      margin-top: 48px;
      
      .copyright-card {
        display: flex;
        gap: 20px;
        padding: 24px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf0 100%);
        border-radius: 16px;
        margin-bottom: 32px;
        
        .copyright-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          
          .el-icon {
            font-size: 24px;
            color: #fff;
          }
        }
        
        .copyright-content {
          h4 {
            font-size: 16px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 8px;
          }
          
          p {
            font-size: 13px;
            color: #666;
            margin: 4px 0;
            line-height: 1.6;
          }
          
          .url {
            color: #667eea;
            word-break: break-all;
          }
        }
      }
      
      .related-articles {
        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 20px;
          
          .el-icon {
            color: #667eea;
          }
        }

        .related-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;

          .related-item {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid rgba(0, 0, 0, 0.04);
            
            &:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
              
              img {
                transform: scale(1.05);
              }
            }
            
            img {
              width: 100%;
              height: 120px;
              object-fit: cover;
              transition: transform 0.3s;
            }
            
            .related-info {
              padding: 12px;
              
              h5 {
                font-size: 14px;
                font-weight: 500;
                color: #333;
                margin: 0 0 6px;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              
              .related-date {
                font-size: 12px;
                color: #999;
              }
            }
          }
        }
      }
    }
  }
  
  // 返回按钮
  .back-to-list {
    position: fixed;
    top: 80px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.3s;
    z-index: 100;
    
    &:hover {
      background: #667eea;
      color: #fff;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .article-wrapper {
    .article-header {
      padding: 40px 20px 30px;
      
      .header-content {
        .article-title {
          font-size: 24px;
        }
        
        .article-meta {
          gap: 16px;
          
          .meta-item {
            font-size: 13px;
          }
        }
      }
    }
    
    .article-body {
      padding: 24px 16px;
      
      .content-wrapper {
        font-size: 15px;
        
        :deep(h1) { font-size: 24px; }
        :deep(h2) { font-size: 20px; }
        :deep(h3) { font-size: 18px; }
      }
      
      .article-footer {
        .copyright-card {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .related-articles {
          .related-list {
            grid-template-columns: 1fr;
          }
        }
      }
    }
    
    .back-to-list {
      top: auto;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
