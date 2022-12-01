const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/vote-api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: false,
      pathRewrite: {
        "/vote-api/": "/",
      }
    })
  );

  app.use(
    '/admin-api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: false,
      pathRewrite: {
        "/admin-api/": "/",
      },
    })
  );

};