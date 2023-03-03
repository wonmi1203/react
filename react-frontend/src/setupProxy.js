// module import -> npm install http-proxy-middleware
// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://18.212.94.168:4040", // 비즈니스 서버 URL 설정
      changeOrigin: true,
      withCredentials: true
    })
  );
};
