// 用于存储开发时候的代码！

const baseConfig = require('./base.config.js')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(baseConfig, {
   devServer: {
      contentBase: './dist', // 用于服务根目录下的 dist 文件夹
      inline: true, // 是否需要实时监听
      // port: '',
      // historyApiFallback: // 在SPA页面中,依赖HTML5的history模式
  }
})

// module.exports = {
//     devServer: {
//         contentBase: './dist', // 用于服务根目录下的 dist 文件夹
//         inline: true, // 是否需要实时监听
//         // port: '',
//         // historyApiFallback: // 在SPA页面中,依赖HTML5的history模式
//     }
// }