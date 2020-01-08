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
}