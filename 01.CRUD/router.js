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
var Student = require('./student')

// Student.updateById({
//    id: 1,
//    name: 'kobe',
//    age: 3333333
// }, function(err) {
//    if(err) {
//       return console.log('修改失败...')
//    }
//    console.log('修改成功...')
// })

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

   Student.find(function(err,students) {
      if(err) {
         return res.status(500).send('Server error')
      }
      res.render('index.html', {
         fruits: [
            '西瓜',
            '苹果',
            '梨'
         ],
         students: students
      })
   })
})

router.get('/students', function(req, res) {

})

router.get('/students/new', function(req, res) {
   res.render('new.html')
})

router.post('/students/new', function(req, res) {
   // 1.获取表单数据
   // 2.处理
      // 将数据保存到 db.json 中,用以持久化
   // 3.发送响应

   // 先将 db.json 文件读取出来,转为对象
   // 然后往对象中 push 数据
   // 然后把对象转为字符串
   // 最后把字符串再次写入文件中
   // console.log(req.body)
   Student.save(req.body, function(err) {
      if(err) {
         return res.status(500).send('Server error...')
      }
      res.redirect('/')
   })
})

// 渲染编辑学生页面
router.get('/students/edit', function(req, res) {
   // 1.在客户端的列表页中处理链接问题,需要有id参数
   // 2.获取要编辑的学生id
   // 3.渲染编辑页面
   // 根据id把学生信息查出来
   // 使用模板引擎渲染页面
   // console.log(req.query.id)
   Student.findById(parseInt(req.query.id), function(err, student) {
      if(err) {
         return res.status(500).send('Server error.')
      }
      // console.log(student)
      res.render('edit.html', {
         student: student
      })
   })

})


// 处理编辑学生
router.post('/students/edit', function(req, res) {
   // 1.获取表单数据
   //   req.body
   // 2.更新
   //    Student.updateById()
   // 3.发送响应
   // console.log(req.body)
   Student.updateById(req.body, function(err) {
      if(err) {
         return res.status(500).send('Server error.')
      }
      res.redirect('/')
   })
})

router.get('/students/delete', function(req, res) {
   // 1.获取要删除的 id
   // 2.根据 id 执行删除操作
   // 3.根据操作结果发送响应数据
   // console.log(req.query.id)
   Student.deleteById(req.query.id, function(err) {
      if(err) {
         return res.status(500).send('Server error.')
      }
      res.redirect('/')
   })
})
// c.将router导出
module.exports = router

// d.回到app.js中,把路由容器挂载到 app 服务中
// app.use(router)




// 回调函数的基本形式
// function add(x,y,callback) {
//    console.log(1)
//    setTimeout(function() {
//       var ret = x + y
//       callback(ret)
//    }, 1000)
// }
// add(1,2,function(ret) {
//    console.log(ret)
// })