const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config
    .resolve
    .alias
    .set('@@', resolve('src/assets/scss/'))
  },
  css: {
    requireModuleExtension: false
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"] // 加入ts 和 tsx
    },
  },
}