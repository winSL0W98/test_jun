const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/oauth',
      createProxyMiddleware({
        target: 'http://api.pixlpark.com',
        changeOrigin: true,
      })
  );

  app.use(
      '/orders',
      createProxyMiddleware({
        target: 'http://api.pixlpark.com',
        changeOrigin: true,
      })
  );
};