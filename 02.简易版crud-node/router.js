/**
 * router.js 路由模块
 * 职责:
 *    处理路由
 *    根据不同的请求方法,请求路径设置具体的请求函数
 * 模块职责要单一,清晰
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

// 为了保证职能单一,此文件中仅存放所有与路由相关的代码

// 如何在这个文件中使用 app 呢
// 使用module.exports = function(app) {},将所有路由相关代码放进function里面
// module.exports = function(app) {
//    app.get('/students', function(req,res) {
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
//    })

//    app.get('/students/new', function(req,res) {

//    })

//    app.get('/students/new', function(req,res) {

//    })

//    app.get('/students/edit', function(req,res) {

//    })

//    app.get('/students/edit', function(req,res) {

//    })

//    app.get('/students/delete', function(req,res) {

//    })
// }


// Express提供了一种更好的方式
// 专门用来包装路由的
// 此处引入express的目的是为了点出Router
var express = require('express')
var fs = require('fs')
var Student = require('./student')

// 1.创建一个路由容器
var router = express.Router()

// 2.将路由都挂载到 router 路由容器中
router.get('/students', function(req,res) {
// 我们需要将db.json文件中的数据读取出来
// readFile的第二个参数是可选的,传入 utf8 就是告诉它将读取到的文件直接安装utf8编码转成我们能够认识的字符
// 除了上述的 utf8的方式外,我们还可以通过 data.toString() 的方式进行转换成我们能够认识的字符
fs.readFile('./db.json','utf8', function(err, data) {
   if(err) {
      // 返回500状态码用以说明服务端有错误
      return res.status(500).send('Server error...')
   }
   // 此处拿到数据,可以发现数据在终端成功打印出来了,注意,此时的数据是字符串类型
   // 好了,现在我们已经成功拿到数据了,就想将数据渲染到下面的render函数中用来替换掉那些假数据
   // console.log(data)
   // console.log(typeof data)
   
   // 我们需要使用data数据,所以要将render函数的代码放进来
   res.render('index.html', {
      // 先不直接从db.json中读取数据,先在这里模拟一下假数据
      // students: [
      //    {"id": 1, "name": "sxw", "gender": 0, "age": 18, "hobbies": "篮球"},
      //    {"id": 2, "name": "iu", "gender": 1, "age": 18, "hobbies": "唱歌"}
      // ]
      
      // 我们需要的是一个数组,而这里的data是一个字符串(上面28行已经验证过了)
      // 使用JSON.parse(data),将其先转成对象,然后对象中有个属性叫做 students ,我们通过点 . 的方式取出来
      // 将右边上述处理完成的数据赋值给左边的变量,进行遍历渲染
      students: JSON.parse(data).students
   })
})
})

router.get('/students/new', function(req,res) {
   res.render('new.html')
})

// 以下路由是处理我们获取到表单自动提交的数据的
// 并对数据进行处理操作
router.post('/students/new', function(req,res) {
   // 1.获取表单数据
   // 在express中没有获取post请求的api,我们需要使用第三方插件 
   // npm install body-parser --save

   // 2.处理
   // 将数据保存到db.json中,用以持久化
   // 首先应该明白的是,db.json文件中的内容是字符串
   //    我们应该先将内容(也就是字符串)读取出来,转为对象
   //    然后往对象中push数据
   //    完成之后再将对象转回字符串
   //    最后重新写入进文件中

   // 3.发送相应
   // console.log(req.body)
   Student.save(req.body, function(err) {
      if(err) {
         return res.status(500).send('Server error...')
      }
      // 没有错的话,我们将其重定向到首页,此时就能发现数据发生变化了
      res.redirect('/students')
   })
})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', function(req,res) {
   // 1.在客户端的列表页中处理链接问题(需要有 id 参数)
   // 2.获取要编辑的学生 id
   // 3.渲染编辑页面
   //    根据id把学生信息查出来
   //    使用模板引擎渲染页面

   // 因为id在查询字符串里面,所有使用req.query.id的方式来拿
   // console.log(req.query.id)
   // res.render('edit.html', {

   // })
   // 第一个参数是 id ,我们通过req.query.id获取到的是一个字符串,所以需要通过parseInt来将其转为数字
   Student.findById(parseInt(req.query.id), function(err,student) {
      if(err) {
         return res.status(500).send('Server error...')
      }
      // console.log(student)
      res.render('edit.html', {
         // 将student传递给edit.html,然后在edit.html文件中,我们就可以通过student.name来进行渲染了
         student: student
      })
   })
})

/**
 * 处理编辑学生
 */
router.post('/students/edit', function(req,res) {
   // 1.获取最新的表单数据
   //    req.body
   // 2.更新
   //    Student.updateById()
   // 3.发送响应
   // console.log(req.body)
   Student.updateById(req.body, function(err) {
      if(err) {
         return res.status(500).send('Server error...')
      }
      res.redirect('/students')
   })
})

/**
 * 处理删除学生
 */
router.get('/students/delete', function(req,res) {
   // 1.获取要删除的id
   // 2.根据id执行删除操作
   // 3.根据操作结果发送响应数据
   // console.log(req.query.id)
   Student.deleteById(req.query.id, function(err) {
      if(err) {
         return res.status(500).send('Server error...')
      }
      res.redirect('/students')
   })
})

// 3.将router导出,谁来加载我,谁就得到router
module.exports = router
