const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  publicPath: './',
  outputDir: 'dist', 
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'muffin~'
    }
  },
  devServer: {
    hot: true,
    proxy: {
    }
  }
})
