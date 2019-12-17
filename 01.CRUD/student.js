// 此文件为数据操作文件模块,职责为: 操作文件中的数据,只处理数据,不关心业务






var fs = require('fs')
var dbPath = './db.json'
// 获取所有学生
// callback中的参数,
// 第一个参数是error
//       成功是 null
//       失败是 错误结果
// 第二个参数是结果
//       成功是 数组
//       错误是 undefined
// return []
exports.find = function(callback) {
   fs.readFile(dbPath,'utf-8', function(err, data) {
      // data是字符串
      // JSON.parse(data)转为对象
      // JSON.parse(data).students
      if(err) {
         return callback(err)
      }
      callback(null, JSON.parse(data).students)
   })
}


// 根据id,获取学生信息对象
exports.findById = function(id, callback) {
   fs.readFile(dbPath,'utf-8', function(err, data) {
      // data是字符串
      // JSON.parse(data)转为对象
      // JSON.parse(data).students
      if(err) {
         return callback(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find(function(item) {
         return item.id === parseInt(id)
      })
      callback(null, ret)
   })
}



// 添加保存学生
exports.save = function(student, callback) {
   fs.readFile(dbPath, 'utf8', function(err,data) {
      if(err) {
         return callback(err)
      }
      var students = JSON.parse(data).students

      // 处理id,不能够重复
      student.id = students[students.length - 1].id + 1

      // 把用户传递的对象保存到数组中
      students.push(student)

      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
         students: students
      })

      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function(err) {
         if(err) {
            // 错误就是将错误对象传递给它
            return callback(err)
         }
         // 成功就是没有错,所以错误对象是 null
         callback()
      })
   })
}
// 调用的形式
// save({
//    name: xx,
//    age: 18 
// }, function(err) {
//    if(err) {
//       console.log('保存失败了')
//    }else {
//       console.log('保存成功了')
//    }
// })



// 更新学生
exports.updateById = function(student,callback) {
   fs.readFile(dbPath, 'utf8', function(err,data) {
      if(err) {
         return callback(err)
      }
      var students = JSON.parse(data).students

      // 注意: 这里将 id 统一转换为数字类型
      student.id = parseInt(student.id)
 
      // 你要修改谁,就把谁找出来
      // 当某个遍历项符合 item.id === student.id 条件的时候,find会终止遍历,同时返回返回遍历项
      var stu = students.find(function(item) {
         return item.id === student.id
      })
      // 遍历拷贝对象
      for(var key in student) {
         stu[key] = student[key]
      }

      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
         students: students
      })

      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function(err) {
         if(err) {
            // 错误就是将错误对象传递给它
            return callback(err)
         }
         // 成功就是没有错,所以错误对象是 null
         callback()
      })

   })
}
// updateById({
//    id: 1,
//    name: 'xx',
//    age: 18
// }, function(err) {

// })



// 删除学生
exports.deleteById = function(id,callback) {
   fs.readFile(dbPath, 'utf8', function(err,data) {
      if(err) {
         return callback(err)
      }
      var students = JSON.parse(data).students

      var deleteId = students.findIndex(function(item) {
         return item.id === parseInt(id)
      })

      // 根据下标从数组中删除对应的学生对象
      students.splice(deleteId, 1)

      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
         students: students
      })

      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function(err) {
         if(err) {
            // 错误就是将错误对象传递给它
            return callback(err)
         }
         // 成功就是没有错,所以错误对象是 null
         callback()
      })


   })
}


