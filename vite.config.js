import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import postCssPxToRem from 'postcss-pxtorem';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 设置主机和端口号
    host: '127.0.0.1',
    port: 3000,
    // 自动打开浏览器（相当于Webpack中的openBrowser）
    open: true,
    // 严格端口模式，如果端口被占用则退出（类似choosePort功能）
    strictPort: true,
    // 热更新配置（Vite内置了比Webpack更快的HMR）
    hmr: {
      overlay: true // 显示错误覆盖层
    },
    // 代理配置（相当于prepareProxy）
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7100', // 代理的目标地址
        changeOrigin: true,  // 支持跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径（可选）
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75, // 根元素字体大小。根据设计稿的宽度设置，例如750px的设计稿应设置为75
          propList: ['*'], // 需要转换的属性，'*' 表示所有属性
          unitPrecision: 5, // 保留rem小数点后多少位
          selectorBlackList: [], // 要忽略的选择器
          replace: true, // 替换包含rems的规则，而不是添加回退
          mediaQuery: false, // 允许在媒体查询中转换px
          minPixelValue: 0, // 设置要替换的最小像素值
          exclude: /node_modules/i, // 排除 node_modules 文件夹
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('src'), // 配置src的别名 用 @ 代表 src 目录
    },
  },
});
