// 用于存放公共的配置代码！

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        // publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/i, // 正则匹配所有的css文件,对于匹配上的所有文件应用下面两个 loader
                use: ['style-loader', 'css-loader'], // css-loading只负责帮我们进行打包,不负责解析,代码生效 // style-loader负责将我们的样式添加到我们的DOM中进行生效 // 使用多个 loader 的时候是从右向左的
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      // 当webpack加载图片的时候,会先看一下我们的图片是大于下面这个限制的还是小于下面这个限制
                      // 如果是小于下面这个限制,就会将图片转换成为base64格式字符串进行加载

                      // 如果是大于下面这个限制,就会采用另外一种file-loader模块的形式去加载我们的图片
                      // file-loader只需要直接安装即可 npm install file-loader --save-dev
                      // 注意了: 我们实现图片的打包之后会在dist文件夹里面生成一个新的图片,并且以32位的hash值进行命名,但是界面并不会显示出来,原因就是路径引用不对,所以我们应该去上述的output中再加上一个publicPath: 'dist/' , 只要加上了这个东西,以后所有有关url加载的问题,都会在url地址前面添加上 dist/ 这个路径的
                      limit: 8192, // 8kb*1024

                      // 用于对我们的图片进行命名
                      // 我们希望打包之后的图片位于img文件夹下,[name]表示打包出来的图片引用原来的图片名字, . 表示拼接上 [hash:8]表示截取8为hash值然后进行拼接,最后再拼接上扩展名
                      name: 'img/[name].[hash:8].[ext]'
                    },
                  }
                ]
            },
            {
                test: /\.js$/,
                // 排除,表示进行es5转换的时候只需要转换src下的文件就可以了,而忽视掉node_modules等不相关的文件
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    // 如果安装官网这样配置的话,他会根据 preset-env去找 babel.rc 文件,我们还需要再去配置,不好
                    // presets: ['@babel/preset-env']
                    presets: ['es2015']
                  }
                }
            },
            {
                // 匹配 \. 转义为 .
                // $表示以...结尾
                // 匹配所有以.vue结尾的文件
                test: /\.vue$/,
                use: ['vue-loader']
                // 如果还有报错的话,就应该是vue-loader的版本问题了,我们可以去webpack.config.js中修改vue-loader的版本到13.0.0
            }
        ],  
    },
    resolve: {
        extensions: ['.js','.css','.vue'], // 表示这些扩展名字在书写的时候,可以省略
        // 别名
        alias: {
            // 下面这行代码的意思就是,当我们import vue的时候,他会默认去 vue/dist/vue.esm.js 里面去找我们的能够解析template 模板的vue模板
            // 也就是说将我们 import 的 vue 做一下替换,换成能够识别template的vue版本
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.BannerPlugin('最终版权归iu和sxw所有!'),
        new HtmlWebpackPlugin({
            template: 'index.html' // 根据这个模板进行生成目标文件
        }),
    ],
}