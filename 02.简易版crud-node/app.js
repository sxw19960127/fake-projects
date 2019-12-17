/**
 * app.js 入口模块
 * 职责:
 *    启动服务
 *    做一些服务相关的配置
 *    模板引擎
 *    body-parser 解析表单 post 请求体
 *    提供静态资源服务
 *    挂载路由 app.use(router)
 *    监听端口去启动服务
 */

var express = require('express')
// var fs = require('fs')

// 导入路由
var router = require('./router')

// 导入用以解析post请求方式的第三方插件
var bodyParser = require('body-parser')

var app = express()

// 开放静态文件,以后我们在请求文件的时候, href="/public/..."就行
app.use('/public/', express.static('./public/'))

// 当匹配 / 的时候,展示 index.html 文件
// 发现这样并不行,需要我们去配置模板引擎
// 安装模板引擎,这里有两个包,一起下载吧 npm install art-template express-art-template --save 
// 安装完毕之后,添加上下面这段代码,来自官网
app.engine('html', require('express-art-template')) // 这里我们加载了express-art-template后,它会自动去加载art-template包


// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前进行
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// 为了保证职能单一,所以将此处路由相关的代码进行抽离到router.js文件中去
// app.get('/', function(req,res) {
//    // 我们需要将db.json文件中的数据读取出来
//    // readFile的第二个参数是可选的,传入 utf8 就是告诉它将读取到的文件直接安装utf8编码转成我们能够认识的字符
//    // 除了上述的 utf8的方式外,我们还可以通过 data.toString() 的方式进行转换成我们能够认识的字符
//    fs.readFile('./db.json','utf8', function(err, data) {
//       if(err) {
//          // 返回500状态码用以说明服务端有错误
//          return res.status(500).send('Server error...')
//       }
//       // 此处拿到数据,可以发现数据在终端成功打印出来了,注意,此时的数据是字符串类型
//       // 好了,现在我们已经成功拿到数据了,就想将数据渲染到下面的render函数中用来替换掉那些假数据
//       // console.log(data)
//       // console.log(typeof data)
      
//       // 我们需要使用data数据,所以要将render函数的代码放进来
//       res.render('index.html', {
//          // 先不直接从db.json中读取数据,先在这里模拟一下假数据
//          // students: [
//          //    {"id": 1, "name": "sxw", "gender": 0, "age": 18, "hobbies": "篮球"},
//          //    {"id": 2, "name": "iu", "gender": 1, "age": 18, "hobbies": "唱歌"}
//          // ]
         
//          // 我们需要的是一个数组,而这里的data是一个字符串(上面28行已经验证过了)
//          // 使用JSON.parse(data),将其先转成对象,然后对象中有个属性叫做 students ,我们通过点 . 的方式取出来
//          // 将右边上述处理完成的数据赋值给左边的变量,进行遍历渲染
//          students: JSON.parse(data).students
//       })
//    })
// })

// 注册路由
// router(app)

// 把路由容器挂载到app容器中
app.use(router)

app.listen(3000, function() {
   console.log('running 3000...')
})

// app.js基本职能
// 创建服务、完成基本配置、启动监听

