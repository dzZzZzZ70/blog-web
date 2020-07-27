module.exports = {
  devServer: {
    port: 2033,
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:80/',
            pathRewrite: {
                '^/api': ''
            },
            changeOrigin: true
        }

    }
},

  lintOnSave: false
}