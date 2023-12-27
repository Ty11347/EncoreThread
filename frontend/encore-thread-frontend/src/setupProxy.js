const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
      // request url start with '/api' will trigger this proxy, '/api' will be auto removed
      // eg: 'http://localhost:8080/user/id' => '/api/user/id'

      '/api',
      createProxyMiddleware({
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite(path) {
          return path.replace('/api', '')
        }
      })
  )
}
