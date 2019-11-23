/**
 * app.js 入口模块
 * 职责:
 *    创建服务
 *    做一些服务相关的配置
 *       模板引擎
 *       body-parser 解析表单 post 请求体
 *       提供静态资源服务
 *    挂载路由
 *    监听端口启动服务
 * 
 */

var express = require('express')
var fs = require('fs')
// 第3步: 引入 router 文件,也就是引入了一个函数
var router = require('./router')

var app = express()

// 将 node_modules 和 public 文件夹开放出来
// 对应引资源处的路径应该这样写 <link href="/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
app.use('/node_modules/', express.static('./node_modules/'))


app.use('/public/', express.static('./public/'))


app.engine('html', require('express-art-template'))

// 使用模块化的思想,将下面这些代码放到 router.js 中去
// app.get('/', function(req,res) {
//    // readFile 的第二个参数是可选的,传入 utf-8 就是告诉它将我们读取到的文件直接按照 utf-8 编码转成我们能够认识的字符
//    // 除了上述这种方式外,还可以通过 data.toString() 的方式来进行转换
//    fs.readFile('./db.json', 'utf-8', function(err, data) {
//       if(err) {
//          return res.status(500).send('Server error.')
//       }
//       // console.log(data)
//       // console.log(typeof(data)) // 是 string 类型数据
//       res.render('index.html', {
//          fruits: [
//             '西瓜',
//             '苹果',
//             '梨'
//          ],
//          // 通过 JSON.parse() 先转成对象,再通过 . 的方式取出数据
//          // 文件中读出来的数据是对象,我们要想使用之前必须先要进行转换一下
//          students: JSON.parse(data).students
//       })
//    })
//    // res.send('你好，世界!')
//    // res.render('index.html', {
//    //    fruits: [
//    //       '西瓜',
//    //       '苹果',
//    //       '梨'
//    //    ],
//    //    students: [ // 先尝试一下写死一组数据,成功!
//    //       {"id": 1, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
//    //       {"id": 2, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
//    //       {"id": 3, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
//    //       {"id": 4, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
//    //       {"id": 5, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
//    //       {"id": 6, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"}
//    //    ]
//    // })
// })


// 第4步: 注册路由,执行函数,并且将 app 作为参数传递进去
// router(app)

// d
app.use(router)

app.listen(3000, function() {
   console.log('running 3000...')
})


// 第1步: 通过下面代码将 app.js 暴露出去,因为在我们的 router.js 路由文件中需要使用 app这个变量,而app这个变量只是存在于 app.js中
module.exports = app