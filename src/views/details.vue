<template>
	<div class="inner-box" @click="showLove">
		<div class="container">
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
		<div class="maxWidthView inner ">
			<div class="article-item" v-if="article">
				<aside class="title">
					<h4>{{ article.title }}</h4>
					<p>
						<small class="small">作者: <span>{{ article.author }}</span> </small>
						<small class="small">更新于: {{ article.date }}</small>
					</p>
				</aside>
				<div class="time hidden-xs-only">
					<span class="day">{{ article.day }}</span>
					<span class="month">{{ article.month }}</span>
					<span class="year ">{{ article.year }}</span>
				</div>
				<div class="artiledetail">
					<div v-html="renderedContent"></div>
					<div class="copyright ">
						<p class="f-toe">非特殊说明，本文版权归 muffin个人博客 所有，转载请注明出处.</p>
						<p class="f-toe">本文标题：{{ article.title }}</p>
						<p class="f-toe">本文网址：muffin</p>
					</div>
				</div>
			</div>
			<div v-else class="article-not-found">
				<h3>文章未找到</h3>
				<p>抱歉，您访问的文章不存在或已被删除。</p>
				<el-button type="primary" @click="goBack">返回博客列表</el-button>
			</div>
		</div>
	</div>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById } from '@/data/articles.js'
import MarkdownIt from 'markdown-it'

// 初始化markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const route = useRoute()
const router = useRouter()
const article = ref(null)

// 计算属性获取文章ID
const currentArticleId = computed(() => {
  // 尝试从查询参数获取ID
  const id = route.query.id
  console.log('从查询参数获取ID:', id)
  return id
})

// 计算属性，将Markdown内容转换为HTML
const renderedContent = computed(() => {
  if (!article.value || !article.value.content) {
    return ''
  }
  
  // 如果内容已经是HTML格式（包含HTML标签），则直接返回
  if (/<[^>]+>/.test(article.value.content)) {
    return article.value.content
  }
  
  // 否则将Markdown转换为HTML
  return md.render(article.value.content)
})

// 加载文章数据
const loadArticle = () => {
  try {
    const id = currentArticleId.value
    console.log('准备加载文章，ID:', id)
    
    if (!id) {
      console.error('文章ID为空')
      article.value = null
      return
    }
    
    // 直接调用getArticleById，不需要再次转换为数字类型
    // 因为articles.js中的getArticleById函数已经处理了类型转换
    const articleData = getArticleById(id)
    console.log('获取到的文章数据:', articleData)
    
    article.value = articleData
  } catch (error) {
    console.error('加载文章失败:', error)
    article.value = null
  }
}

// 返回博客列表
const goBack = () => {
  router.push('/BlogList')
}

// 监听路由参数变化，重新加载文章
watch(() => route.query.id, () => {
  console.log('路由参数变化，重新加载文章')
  loadArticle()
}, { immediate: true })

// 组件挂载后延迟加载，确保路由参数已经解析完成
onMounted(() => {
  setTimeout(() => {
    console.log('onMounted后延迟加载文章')
    loadArticle()
  }, 100)
})

// 点击页面显示爱心
const showLove = (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const text = document.createElement('span');
  text.classList.add('floating-text'); // 添加CSS类
  text.style.left = x + 'px';
  text.style.top = y + 'px';
  text.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  const texts = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
  text.innerText = texts[Math.floor(Math.random() * texts.length)];
  document.body.appendChild(text);

  // 动画结束后移除元素
  text.addEventListener('animationend', () => {
    document.body.removeChild(text);
  });
};
</script>

<style lang="scss" scoped>
@import '@/global/meteor.css';

.inner-box {
	padding: 0 5px;
	overflow: hidden;
	background-image: url('~@/assets/images/info.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    position: relative;
}

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
}

// 定义浮动文字的动画
@keyframes float-up {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-150px) scale(1.5);
    opacity: 0;
  }
}

// 浮动文字的样式
:global(.floating-text) {
  position: absolute;
  z-index: 9999;
  font-size: 20px;
  animation: float-up 2s ease-out forwards;
  pointer-events: none; // 确保文字不会干扰其他点击事件
}

.inner {
    position: relative;
    z-index: 2;
	.article-item {
		background: rgba(255, 255, 255, 0.8);
		padding: 20px;
		border-radius: 10px;
		.artiledetail {
			// Markdown内容样式
			:deep(h1) {
				font-size: 24px;
				font-weight: bold;
				margin: 20px 0 15px 0;
				padding-bottom: 10px;
				border-bottom: 1px solid #eee;
			}
			
			:deep(h2) {
				font-size: 22px;
				font-weight: bold;
				margin: 18px 0 12px 0;
				padding-bottom: 8px;
				border-bottom: 1px solid #eee;
			}
			
			:deep(h3) {
				font-size: 20px;
				font-weight: bold;
				margin: 15px 0 10px 0;
			}
			
			:deep(h4) {
				font-size: 18px;
				font-weight: bold;
				margin: 12px 0 8px 0;
			}
			
			:deep(p) {
				margin: 10px 0;
				line-height: 1.6;
			}
			
			:deep(ul), :deep(ol) {
				margin: 10px 0;
				padding-left: 30px;
			}
			
			:deep(li) {
				margin: 5px 0;
			}
			
			:deep(blockquote) {
				margin: 15px 0;
				padding: 10px 20px;
				border-left: 4px solid #ddd;
				background-color: transparent;
				color: #666;
			}
			
			:deep(code) {
				padding: 2px 4px;
				background-color: transparent;
				border-radius: 3px;
				font-family: Consolas, Monaco, 'Andale Mono', monospace;
				color: #e83e8c;
			}
			
			:deep(pre) {
				margin: 15px 0;
				padding: 15px;
				background-color: transparent;
				border-radius: 5px;
				overflow-x: auto;
				
				code {
					padding: 0;
					background-color: transparent;
					color: inherit;
				}
			}
			
			:deep(table) {
				width: 100%;
				border-collapse: collapse;
				margin: 15px 0;
			}
			
			:deep(th), :deep(td) {
				padding: 8px 12px;
				border: 1px solid #ddd;
				text-align: left;
			}
			
			:deep(th) {
				background-color: #f5f5f5;
				font-weight: bold;
			}
			
			:deep(a) {
				color: #1890ff;
				text-decoration: none;
				
				&:hover {
					text-decoration: underline;
				}
			}
			
			:deep(img) {
				max-width: 100%;
				height: auto;
				margin: 10px 0;
				border-radius: 4px;
			}

			.copyright {
				.f-toe {
					overflow: hidden;
					word-wrap: normal !important;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				p {
					color: #565755;
					font-size: 13px;
				}

				clear: both;
				background-color: #f8f9f7;
				padding: 15px 20px;
				line-height: 22px;
				text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
				font-size: 12px;
				color: #787977;
				margin-top: 20px;
			}

			margin: 20px 0 0 0;
			line-height: 28px;
			position: relative;
			min-height: 200px;
			border-bottom: 1px solid #e1e2e0;
			padding-bottom: 20px;
			color: #6e6e6e;
			font-size: 15px;
		}

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
			background-color: transparent;
			padding: 0 0 5px 20px;
			position: absolute;
			right: 20px;
			top: 20px;
		}

		.title {
			h4 {
				font-weight: 500;
				color: #787977;
			}

			.small {
				span {
					color: #3e8bc7;
				}

				margin-right: 20px;
				color: #787977;
				font-size: 13px;
			}

			padding: 5px 0 5px 0;
			border-bottom: 1px solid #e8e9e7;
			font-size: 18px;
			font-weight: 400;
		}

		padding: 20px 30px 25px 30px;
		position: relative;
	}

	background-color: transparent;
	margin: 20px auto 0 auto;

}

p {
	margin: 0;
}
</style>