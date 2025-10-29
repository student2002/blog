// 文章数据管理

// 导入所有文章文件
import code2025 from './技术/code2025-10-30.json';
import happyWeekend from './生活/life2025-10-30.json';
import thinkingAboutFuture from './杂谈/imagine2025-10-30.json';

// 使用require.context动态导入所有图片
const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { 
    images[item.replace('./', '')] = r(item); 
  });
  return images;
};

// 导入assets/images目录下的所有图片
const images = importAll(require.context('@/assets/images/', false, /\.(png|jpe?g|svg)$/));

// 处理文章数据中的图片路径
const processArticleImages = (article) => {
  if (article.image) {
    try {
      // 直接使用图片名称
      const fileName = article.image;
      // 从已导入的图片中查找匹配的图片
      if (images[fileName]) {
        article.image = images[fileName];
      } else {
        console.warn(`Image ${fileName} not found in assets/images directory`);
        article.image = images['article-1.jpg']; // 使用默认图片
      }
    } catch (error) {
      console.error('Error processing image for article', article.id, ':', error);
      // 如果出错，使用默认图片
      article.image = images['article-1.jpg'];
    }
  }
  return article;
};

// 组合所有文章
const articles = [
  processArticleImages(code2025),
  processArticleImages(happyWeekend),
  processArticleImages(thinkingAboutFuture)
];

// 获取所有文章
export function getAllArticles() {
  return articles;
}

// 根据ID获取文章
export function getArticleById(id) {
  return articles.find(article => article.id === parseInt(id));
}

// 获取文章分类
export function getCategories() {
  const categories = [...new Set(articles.map(article => article.category))];
  return ['全部文章', ...categories];
}

// 获取所有标签
export function getAllTags() {
  const tags = new Set();
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}