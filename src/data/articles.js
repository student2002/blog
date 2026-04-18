// 文章数据管理

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

// 使用require.context动态导入data目录下所有子目录中的JSON文件
// 只需在 技术/生活/杂谈 目录下添加json文件，即可自动生成博客页面
const articleContext = require.context('./', true, /\.json$/);

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

// 自动扫描所有子目录下的JSON文件并组装文章列表
const articles = articleContext.keys()
  .map(key => {
    const article = articleContext(key);
    // 如果JSON模块有default属性（某些webpack配置下），取default
    const data = article.default || article;
    return processArticleImages(data);
  })
  .sort((a, b) => {
    // 按id排序
    return (a.id || 0) - (b.id || 0);
  });

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