/**
 * router.js 路由模块
 * 职责:
 *    处理路由
 *    根据不同的请求方法 + 请求路径设置具体的请求函数
 * 模块职责要单一,不能乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 * 
 */


// 第5步: 引入 fs 核心模块,因为下面请求中有用到 fs 
var fs = require('fs')

// 第2步: 将所有的路由全部都放进一个函数中,回到 app.js 中的第3步
// module.exports = function(app) {

var express = require('express')



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
   
   // app.get('/students/new', function(req, res) {
   
   // })
   
   // app.get('/students/new', function(req, res) {
      
   // })
   
   // app.get('/students/new', function(req, res) {
      
   // })
   
   // app.get('/students/new', function(req, res) {
      
   // })
   
   // app.get('/students/new', function(req, res) {
      
   // })
   
   // app.get('/students/new', function(req, res) {
      
   // })
// }


// Express 还提供了一种更加渐变的方式,专门用来包装路由的
// a.创建一个路由容器
var router = express.Router()
// b.将路由全部都挂载到 router 路由容器中,即命名为 router....
router.get('/', function(req,res) {
   // readFile 的第二个参数是可选的,传入 utf-8 就是告诉它将我们读取到的文件直接按照 utf-8 编码转成我们能够认识的字符
   // 除了上述这种方式外,还可以通过 data.toString() 的方式来进行转换
   fs.readFile('./db.json', 'utf-8', function(err, data) {
      if(err) {
         return res.status(500).send('Server error.')
      }
      // console.log(data)
      // console.log(typeof(data)) // 是 string 类型数据
      res.render('index.html', {
         fruits: [
            '西瓜',
            '苹果',
            '梨'
         ],
         // 通过 JSON.parse() 先转成对象,再通过 . 的方式取出数据
         // 文件中读出来的数据是对象,我们要想使用之前必须先要进行转换一下
         students: JSON.parse(data).students
      })
   })
   // res.send('你好，世界!')
   // res.render('index.html', {
   //    fruits: [
   //       '西瓜',
   //       '苹果',
   //       '梨'
   //    ],
   //    students: [ // 先尝试一下写死一组数据,成功!
   //       {"id": 1, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
   //       {"id": 2, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
   //       {"id": 3, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
   //       {"id": 4, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
   //       {"id": 5, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"},
   //       {"id": 6, "name": "张三", "gender": 0, "age": 18, "hobbies": "吃饭、睡觉"}
   //    ]
   // })
})

router.get('/students', function(req, res) {

})

router.get('/students/new', function(req, res) {
   
})

router.post('/students/new', function(req, res) {
   
})

router.get('/students/edit', function(req, res) {
   
})

router.post('/students/edit', function(req, res) {
   
})

router.get('/students/delete', function(req, res) {
   
})
// c.将router导出
module.exports = router

// d.回到app.js中,把路由容器挂载到 app 服务中
// app.use(router)