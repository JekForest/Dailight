module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // 设计稿宽度/10（750px/10=75）
      propList: ['*'], // 转换所有属性的px单位
      selectorBlackList: ['.no-rem'], // 忽略.no-rem开头的选择器
      minPixelValue: 2, // 小于2px不转换
    },
    autoprefixer: {}, // 自动添加浏览器前缀
  },
};