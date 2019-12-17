步骤：

`npm init`初始化项目

`npm install express --save`下载`express`框架

新建文件夹：

- `public`文件夹用以存放开放文件夹
- `views`存放展示页面

`app.js`项目入口模块

# 起步

1.先在`app.js`中写一个`hello world`，跑起来：

```js
var express = require('express')

var app = express()

app.get('/', function(req,res) {
   res.send('hello world')
})

app.listen(3000, function() {
   console.log('running 3000...')
})
```

2.在`views`文件夹中新建`index.html`，是用来展示渲染页面的

```js
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Document</title>
</head>
<body>
   <h1>index Page</h1>
</body>
</html>
```

3.回到`app.js`，现在我们要做的就是将新建好的`index.html`文件，当作首页，当匹配`/`的时候，成功渲染

```js
var express = require('express')

var app = express()

// 当匹配 / 的时候,展示 index.html 文件
// 发现这样并不行,需要我们去配置模板引擎
// 安装模板引擎,这里有两个包,一起下载吧 npm install art-template express-art-template --save 
// 安装完毕之后,添加上下面这段代码,来自官网
// 引擎以html结尾,加载第三方包
app.engine('html', require('express-art-template')) // 这里我们加载了express-art-template后,它会自动去加载art-template包,这样配置完就ok啦

// 当匹配 / 的时候,渲染 index.html 文件
app.get('/', function(req,res) {
   res.render('index.html')
})

app.listen(3000, function() {
   console.log('running 3000...')
})
```

4.开放静态文件

```js
// 开放静态文件,以后我们在请求文件的时候, href="/public/..."就行
app.use('/public/', express.static('./public/'))
```

5.创建静态网页模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Document</title>
</head>
<body>
   <h2>简易模板</h2>
   <a href="#">添加学生功能</a>
   <div>
      <table>
         <thead>
            <tr>
               <th>#</th>
               <th>姓名</th>
               <th>性别</th>
               <th>年龄</th>
               <th>爱好</th>
            </tr>
         </thead>
         <tbody>
            <!-- 使用模板引擎,将需要循环的项放在 {{ each + '循环的对象' }} {{ /each }} 中间,后续循环项中我们要拿到目标对象,直接 $value 就可以拿到了,然后通过点取出对象的不同属性 -->
            {{ each students }}
            <tr>
               <td>{{ $value.id }}</td>
               <td>{{ $value.name }}</td>
               <td>{{ $value.gender }}</td>
               <td>{{ $value.age }}</td>
               <td>{{ $value.hobbies }}</td>
            </tr>
            {{ /each }}
         </tbody>
      </table>
   </div>
</body>
</html>
```

6.新建数据存储文件`db.json`，内容如下

```json
{
   "students": [
      {"id": 1, "name": "sxw", "gender": 0, "age": 18, "hobbies": "篮球"},
      {"id": 2, "name": "iu", "gender": 1, "age": 18, "hobbies": "唱歌"},
      {"id": 3, "name": "lss", "gender": 1, "age": 18, "hobbies": "跳舞"}
   ]
}
```

7.与第5步结合看，将数据渲染进第5步中创建的模板里

我们先模拟一下假数据，试试看行不行：

```js
app.get('/', function(req,res) {
   res.render('index.html', {
      // 先不直接从db.json中读取数据,先在这里模拟一下假数据
      students: [
         {"id": 1, "name": "sxw", "gender": 0, "age": 18, "hobbies": "篮球"},
         {"id": 2, "name": "iu", "gender": 1, "age": 18, "hobbies": "唱歌"}
      ]
   })
})
```

以上假数据已经成功的渲染到了页面上，现在我们需要将`db.json`文件读出来，再渲染替换到假数据上

```js
app.get('/', function(req,res) {
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
         
         // 我们需要的是一个数组,而这里的data是一个字符串(上面13行已经验证过了)
         // 使用JSON.parse(data),将其先转成对象,然后对象中有个属性叫做 students ,我们通过点 . 的方式取出来
         // 将右边上述处理完成的数据赋值给左边的变量,进行遍历渲染
         students: JSON.parse(data).students
      })
   })
})
```

拓展：

说服 `PPT` 脑图 （带有结构性，归类整理）

- 找痛点 `why` 为什么
- 解决方案 `what` 是什么
- 怎么去使用 `how` 怎么用
- `where`在哪里用
- `when`什么时候用

# `CRUD`

1.路由设计

| 请求方法 | 请求路径         | get参数 | post参数                       | 备注             |
| -------- | ---------------- | ------- | ------------------------------ | ---------------- |
| GET      | /students        |         |                                | 渲染首页         |
| GET      | /students/new    |         |                                | 渲染添加学生页面 |
| POST     | /students/new    |         | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id      |                                | 渲染编辑页面     |
| POST     | /students/edit   |         | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id      |                                | 处理删除请求     |

# 模块化思想进行抽离代码

新建一个`router.js`文件用以存放所有路由相关的代码。也就是说，在`app.js`模板里面不存放关于路由相关的代码，为了保证职能单一，我们统一将路由相关代码进行处理、存放。

`router.js`

```js
// 为了保证职能单一,此文件中仅存放所有与路由相关的代码

app.get('/students', function(req,res) {
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

app.get('/students/new', function(req,res) {})

app.get('/students/new', function(req,res) {})

app.get('/students/edit', function(req,res) {})

app.get('/students/edit', function(req,res) {})

app.get('/students/delete', function(req,res) {})
```

存在的问题：如何在`router.js`文件中使用`app`呢？

- 在`router.js`文件中，使用`module.exports = function(app) {},`将路由代码放进`function`里，导出

```js
// 为了保证职能单一,此文件中仅存放所有与路由相关的代码

// 如何在这个文件中使用 app 呢
// 使用module.exports = function(app) {},将所有路由相关代码放进function里面
module.exports = function(app) {
   app.get('/students', function(req,res) {
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

   app.get('/students/new', function(req,res) {

   })

   app.get('/students/new', function(req,res) {

   })

   app.get('/students/edit', function(req,res) {

   })

   app.get('/students/edit', function(req,res) {

   })

   app.get('/students/delete', function(req,res) {

   })
}
```

- 回到`app.js`中，分别进行导入路由和注册路由两步操作

```js
var express = require('express')
// var fs = require('fs')

// 1.导入路由
var router = require('./router')

var app = express()

// 开放静态文件,以后我们在请求文件的时候, href="/public/..."就行
app.use('/public/', express.static('./public/'))

// 当匹配 / 的时候,展示 index.html 文件
// 发现这样并不行,需要我们去配置模板引擎
// 安装模板引擎,这里有两个包,一起下载吧 npm install art-template express-art-template --save 
// 安装完毕之后,添加上下面这段代码,来自官网
app.engine('html', require('express-art-template')) // 这里我们加载了express-art-template后,它会自动去加载art-template包

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

// 2.注册路由
router(app)

app.listen(3000, function() {
   console.log('running 3000...')
})

// app.js基本职能
// 创建服务、完成基本配置、启动监听
```

![路由暴露](C:\Users\lenovo\Desktop\路由暴露.jpg)

上面这种方式也不是最好的，`express`为我们提供了一种更加好的方式，专门用来包装路由的：

不进行方法封装的形式，实现路由：

```js
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


// ***Express提供了一种更好的方式
// 专门用来包装路由的
// 此处引入express的目的是为了点出Router
var express = require('express')
// 设计到文件的读写,需要引入fs核心模块
var fs = require('fs')

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

})

router.get('/students/new', function(req,res) {

})

router.get('/students/edit', function(req,res) {

})

router.get('/students/edit', function(req,res) {

})

router.get('/students/delete', function(req,res) {

})

// 3.将router导出,谁来加载我,谁就得到router
module.exports = router
```

完成上述步骤之后，回到`app.js`中，实现导入路由和挂载路由两步操作：

```js
var express = require('express')
// var fs = require('fs')

// 第一步操作: 导入路由
var router = require('./router')

var app = express()

// 开放静态文件,以后我们在请求文件的时候, href="/public/..."就行
app.use('/public/', express.static('./public/'))

// 当匹配 / 的时候,展示 index.html 文件
// 发现这样并不行,需要我们去配置模板引擎
// 安装模板引擎,这里有两个包,一起下载吧 npm install art-template express-art-template --save 
// 安装完毕之后,添加上下面这段代码,来自官网
app.engine('html', require('express-art-template')) // 这里我们加载了express-art-template后,它会自动去加载art-template包

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

// 第二步操作: 把路由容器挂载到app容器中
app.use(router)

app.listen(3000, function() {
   console.log('running 3000...')
})

// app.js基本职能
// 创建服务、完成基本配置、启动监听
```

以上便完成了路由模块的设计，遵循了各模块职能单一的原则。



# 完成新建学生功能

首先新建一个页面`new.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Document</title>
</head>
<body>
   <h1>添加学生</h1>
   <!-- 客户端的表单默认有提交行为 -->
   <form action="/students/new" methods="post">
      <div>
         <label for="">姓名</label>
         <input id="" type="text" name="name">
      </div>
      <div>
         <label for="">性别</label>
         <label for="">
            <input type="radio" name="gender" value="0">男
         </label>
         <label for="">
            <input type="radio" name="gender" value="1">女
         </label>
      </div>
      <div>
         <label for="">年龄</label>
         <input type="number" name="age">
      </div>
      <div>
         <label for="">爱好</label>
         <input type="text" name="hobbies">
      </div>
      <button type="submit">提交</button>
   </form>
</body>
</html>
```

然后回到路由模块中：

```js
// 当路由匹配 /students/new 的时候,页面渲染 new.html
router.get('/students/new', function(req,res) {
   res.render('new.html')
})
```

当然了，需要我们回到首页`index.html`页面，也就是说当我们点击添加学生按钮的时候，我们给对应的跳转`a`链接的`href`属性为`/students/new`，就行了：

```js
router.post('/students/new', function(req,res) {
   // 1.获取表单数据
   // 在express中没有获取post请求的api,我们需要使用第三方插件 
   // npm install body-parser --save
   
   // 2.处理

   // 3.发送相应

})
```

## `body-parser`

在`Express`中没有内置获取表单`POST`请求体的`API`，这里我们需要使用第三方包：`body-parser`。

```shell
// 安装
npm install body-parser --save
```

```js
// 配置,是在app.js入口模块中进行配置的

// 1.引包
var bodyParser = require('body-parser')

// 2.配置 body-parser
// 只要加入这个配置,则在 req 请求对象上会多出来一个属性: body
// 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
// 以下四行代码
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

```js
// router.js

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
   console.log(req.body)
})
```

## 设计操作数据的`API`模块

我们发现读取`db.json`这个操作不止需要进行一次，所以我们针对`db.json`这个文件，封装一套`API`

新建一个`student.js`文件：

```js
/**
 * 数据操作文件模块
 * 职责: 操作文件中的数据,只处理数据,不关心业务
 * 此文件不关心业务
 * 纯粹针对db.json这个文件数据,进行api的封装
 */


/**
 * 获取所有学生列表
 * return []
 */
exports.find = function() {

}


/**
 * 添加保存学生
 */
exports.save = function() {

}


/**
 * 更新学生
 */
exports.update = function() {

}


/**
 * 删除学生
 */
exports.delete = function() {
   
}
```

## 异步函数得到内部返回值

想要得到一个方法内部的异步函数的返回值，也就是得到异步操作的结果，只有通过回调函数的方法得到结果。

```js
function fn(callback) {
    setTimeout(function() {
        var data = 'sxw'
        callback(data)
    },1000)
}
fn(function(data) {
    console.log(data)
})
```

`student.js`文件

```js
/**
 * 数据操作文件模块
 * 职责: 操作文件中的数据,只处理数据,不关心业务
 * 此文件不关心业务
 * 纯粹针对db.json这个文件数据,进行api的封装
 */
var fs = require('fs')
var dbPath = './db.json'

/**
 * 1.获取所有学生列表
 * 
 * callback中的参数
 *    第一个参数是 err
 *       成功是 null
 *       失败是 错误对象
 *    第二个参数是 结果
 *       成功是 数组
 *       失败是 undefined
 * return []
 */
exports.find = function(callback) {
   fs.readFile(dbPath, function(err,data) {
      if(err) {
         return callback(err)
      }
      callback(null,JSON.parse(data).students)
   })
}
// 我们进行调用的形式
// find(function(err,data) {

// })


/**
 * 2.添加保存学生
 * 方法接收两个参数:
 *    第一个参数student是获取到post表单填写的信息内容
 *    第二个参数是一个回调函数
 */
exports.save = function(student,callback) {
   fs.readFile(dbPath,'utf8',function(err,data) {
      if(err) {
         return callback(err)
      }
      // 将db.path中的data通过JSON.parse,从字符串转为对象
      var students = JSON.parse(data).students
      // 找到数组中最后一项元素的id,加1之后再赋值
      // 处理id是唯一的,不重复的
      student.id = students[students.length - 1].id + 1

      // 将post中获取到的数据push到上述对象最后
      students.push(student)
      // 将经过上述操作之后的数据对象转为字符串
      var fileData = JSON.stringify({
         // 因为db.json中就是一个对象,里面是students
         // 我们这样写比较简便
         students: students
      })
      // 最后将上述处理完毕的结果字符串重新写入文件中
      fs.writeFile(dbPath,fileData, function(err) {
         if(err) {
            // 错误就是将错误对象传递出去,外部调用的函数中的回调函数中才能根据此处的成功与否进行书写回调函数
            return callback(err)
         }
         // 成功就是没有错,错误对象就是null
         callback()
      })
   })
}
// 我们进行调用的形式
// save({
//    name: 'xx',
//    age: 18
// },function(err) {
//    if(err) {
//       console.log('保存失败...')
//    }else {
//       console.log('保存成功...')
//    }
// })


/**
 * 3.更新学生
 */
exports.update = function() {

}


/**
 * 4.删除学生
 */
exports.delete = function() {

}
```

完事之后`router.js`中：

```js
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
```

## 更新学生

`ES6`中的`find`方法的使用：

```js
var arr = [1,2,3]
arr.find(function(item) {
    return item === 3
})
// find循环遍历arr数组,去找符合条件 item === 3,中的这个item,并且将其返回
arr.find(function(item) {
    return item === 4
})
// 如果不存在,则返回一个undefined
```

以下是更新学生的代码部分：

```js
/**
 * 3.更新学生
 * 参数有两个:
 *    一个是对象
 *    另一个是回调函数
 */
exports.updateById = function(student,callback) {
   fs.readFile(dbPath,'utf8',function(err,data) {
      if(err) {
         return callback(err)
      }
      // 将db.path中的data通过JSON.parse,从字符串转为对象
      var students = JSON.parse(data).students
      
      // *后期会出bug***将id转换为数字形式,进行保存
      // 将id统一转换为数字类型进行保存
      student.id = parseInt(student.id)

      // 你要修改谁,就需要将其找出来,根据id
      // 使用es6中的一个数组的方法 find
      // 需要接收一个函数作为参数
      // find会循环遍历,当某一遍历项符合 item.id === student.id 条件的时候,find会终止遍历,并且返回这个符合结果的遍历项(item)
      // stu即为有被修改的那一项
      var stu = students.find(function(item) {
         return item.id === student.id
      })
      // 修改的思想,只要重新传递进来的,我就给你覆盖掉原来的数据
      // 循环遍历student数组
      // 下面这种方式会写死的
      // stu.name = student.name
      // stu.age = student.age
      // 遍历拷贝对象
      for(var key in student) {
         // 即找到项 stu/student,然后将student中新的所有的数据全部覆盖掉stu中,省的我们一个个去核实哪个发生变化了
         stu[key] = student[key]
      }
      
      // 以下两步在很多逻辑操作块中都会使用到
      // 将经过上述操作之后的数据对象转为字符串
      var fileData = JSON.stringify({
         // 因为db.json中就是一个对象,里面是students
         // 我们这样写比较简便
         students: students
      })
      // 最后将上述处理完毕的结果字符串重新写入文件中
      fs.writeFile(dbPath,fileData, function(err) {
         if(err) {
            // 错误就是将错误对象传递出去,外部调用的函数中的回调函数中才能根据此处的成功与否进行书写回调函数
            return callback(err)
         }
         // 成功就是没有错,错误对象就是null
         callback()
      })
   })
}
// updateById({
//    id: 1,
//    name: 'xxx',
//    age: 18
// }, function(err) {
//    ...
// })
```

当然了，我们需要在新建一个`edit.html`文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Document</title>
</head>
<body>
   <h1>添加学生</h1>
   <form action="/students/new" method="post">
      <div>
         <label for="">姓名</label>
         <!-- 直接通过student对象去点出属性来充当value值 -->
         <input id="" type="text" name="name" value="{{ student.name }}">
      </div>
      <div>
         <label for="">性别</label>
         <label for="">
            <input type="radio" name="gender" value="0">男
         </label>
         <label for="">
            <input type="radio" name="gender" value="1">女
         </label>
      </div>
      <div>
         <label for="">年龄</label>
         <input type="number" name="age" value="{{ student.age }}">
      </div>
      <div>
         <label for="">爱好</label>
         <input type="text" name="hobbies" value="{{ student.hobbies }}">
      </div>
      <button type="submit">提交</button>
   </form>
</body>
</html>
```

然后回到`index.html`中，给每一条项后面都加上编辑和删除两个按钮：

```html
<td>
  <!-- 当我们点击a链接的时候,将对应点击的id传递过去,通过在跳转到的页面后面拼接上id,即 ?id=... -->
  <a href="/students/edit?id={{ $value.id }}">编辑</a>
  <a href="/students/delete?id={{ $value.id }}">删除</a>
</td>
```

回到`student.js`中，进行`API`的封装：

```js
/**
 * 根据id获取学生信息对象
 * 获取到需要编辑的那一项
 */
exports.findById = function(id,callback) {
   fs.readFile(dbPath,'utf8', function(err,data) {
      if(err) {
         return callback(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find(function(item) {
         return item.id === id
      })
      callback(null,ret)
   })
}
```

获取到数据之后进行渲染：

```js
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
```

## 编辑学生信息

回到`edit.html`中，将`form`表单中`action`字段路径进行修改：

注意：因为我们需要传递`id`而又不想让其显示出来，所以可以使用`type="hidden"`属性

```html
<form action="/students/edit" method="post">
    <!-- 看不见,但是会随着表单的提交而提交 -->
    <!-- 用来放一些不希望被用户所看见,但是需要被提交到服务端的 -->
    <input type="hidden" value="{{ student.id }}" name="id">
```

`router.js`

```js
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
```

`student.js`

```js
/**
 * 根据id获取学生信息对象
 * 获取到需要编辑的那一项
 */
exports.findById = function(id,callback) {
   fs.readFile(dbPath,'utf8', function(err,data) {
      if(err) {
         return callback(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find(function(item) {
         return item.id === parseInt(id)
      })
      callback(null,ret)
   })
}
```

## 删除

`router.js`

```js
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
```

`student.js`

```js
/**
 * 4.删除学生
 */
exports.deleteById = function(id,callback) {
   fs.readFile(dbPath,'utf8',function(err,data) {
      if(err) {
         return callback(err)
      }
      // 将db.path中的data通过JSON.parse,从字符串转为对象
      var students = JSON.parse(data).students

      // findIndex方法专门用来根据条件查找元素的下标
      // 返回下标
      var deleteId = students.findIndex(function(item) {
         return item.id === parseInt(id)
      })
      // 根据下标从数组中删除对应的学生对象
      students.splice(deleteId, 1)

      // 以下两步在很多逻辑操作块中都会使用到
      // 将经过上述操作之后的数据对象转为字符串
      var fileData = JSON.stringify({
         // 因为db.json中就是一个对象,里面是students
         // 我们这样写比较简便
         students: students
      })
      // 最后将上述处理完毕的结果字符串重新写入文件中
      fs.writeFile(dbPath,fileData, function(err) {
         if(err) {
            // 错误就是将错误对象传递出去,外部调用的函数中的回调函数中才能根据此处的成功与否进行书写回调函数
            return callback(err)
         }
         // 成功就是没有错,错误对象就是null
         callback()
      })
   })
}
```

# 收尾

自己编写的步骤：

- 处理模板
- 配置开放静态资源
- 配置模板引擎
- 简单路由，`/students`渲染静态页出来
- 路由设计
- 提取路由模块
- 由于接下来的业务操作都需要处理文件数据，所有我们需要封装`student.js`
- 先写好`student.js`文件结构
  - 查询所有学生列表的`API` `find`
  - `findById`
  - `save`
  - `updateById`
  - `deleteById`

- 实现具体功能
  - 通过路由收到请求
  - 接收请求中的数据（`get`、`post`）
    - `req.query`
    - `req.body`
  - 调用数据操作`API`处理数据
  - 根据操作结果给客户端发送响应

- 业务功能顺序
  - 列表
  - 添加
  - 编辑
  - 删除

- `find`
- `findIndex`
