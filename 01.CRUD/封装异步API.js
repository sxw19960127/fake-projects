function fn(callback) {
   setTimeout(function() {
      var data = 'sxw'
      callback(data)
   }, 1000)
}

fn(function(data) {
   console.log(data)

})

// 总结: 回调函数的目的就是为了获取异步操作的结果