/**
 * 数据操作文件模块
 * 职责: 操作文件中的数据,只处理数据,不关心业务
 * 此文件不关心业务
 * 纯粹针对db.json这个文件数据,进行api的封装
 * student.js部分是node中的精华部分,即封装异步API
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
   fs.readFile(dbPath,'utf8', function(err,data) {
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