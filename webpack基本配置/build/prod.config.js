// 用以存放生产时候的代码！

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./base.config.js')
const webpackMerge = require('webpack-merge')
// 将 base.config.js 文件和 prod.config.js 文件进行合并并导出
// 这是用于生产环境需要基于的代码
module.exports = webpackMerge(baseConfig, {
   plugins: [
      new UglifyjsWebpackPlugin()
  ]
})

// module.exports = {
//     plugins: [
//         new webpack.BannerPlugin('最终版权归iu和sxw所有!'),
//         new HtmlWebpackPlugin({
//             template: 'index.html' // 根据这个模板进行生成目标文件
//         }),
//         new UglifyjsWebpackPlugin()
//     ]
// }