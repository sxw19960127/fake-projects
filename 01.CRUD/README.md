# Express - CRUD

## 起步

- 初始化
- 模板处理

## 路由设计

| 请求方法 |    请求路径         | get 参数 |       post 参数         |             备注
   Get        /students                                                          渲染首页
   Get        /students/new                                                      渲染添加学生页面
   POST       /students                      name、age、gender、hobbies          处理添加学生请求
   Get        /students/edit        id                                           渲染编辑页面
   POST       /students/edit                 id、name、age、gender、hobbies      处理编辑请求
   GET        /students/delete      id                                           处理删除请求



--------------------------------------------------
路由设计总结:
关于路由的设计有两种方式:
**传统方式**: (共4步)
1.在app.js入口模块中,将app变量暴露出去,因为在router.js文件中需要使用到这个变量
```js
module.exports = app
```
2.封装函数,即将所有的路由方法全都封装进一个函数中
```js
module.exports = function(app) {
   app.get('...', function() {}),
   app.get('...', function() {}),
   ...
}
```
3.回到app.js中,引入router.js文件
```js
var router = require('./router')
```
4.执行函数,也就是执行对应路由方法,并将 app 作为参数传递进去
```js
router(app)
```
5.回到router.js中引入 fs 核心模块,因为涉及到读取文件操作
```js
var fs = require('fs');
```

---------------------------------------------
**使用Express提供的方法**:
Express 提供了一种更加简便的方式,用来包装路由
a.创建一个路由容器
```js
var router = express.Router()
```
b.将路由容器全部都挂载到 router 路由容器中去,并且命名为 router...
```js
router.get('/', function(req, res) {

})
router.get('/students', function(req, res) {

})
```
c.导出router
```js
module.exports = router
```
d.回到 app.js中,将路由容器挂载到app服务中去
```js
app.use(router)
```
e.当然了,在router.js中应该引入 express 框架
```js
var express = require('express');
```


