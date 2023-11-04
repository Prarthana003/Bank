// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/logged_in', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));
};
