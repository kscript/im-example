module.exports = {
  devServer: {
    // https: true,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'development' ? 'http://localhost:3030/' : '/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  },
  configureWebpack: (configure) => {
    return {
      externals: /development|test/.test(process.env.NODE_ENV) ? [] : [{
        'element-ui': 'ELEMENT'
      }]
    }
  },
}