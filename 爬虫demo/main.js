// 卸载最前面: 
// 本来想着爬一爬斗破苍穹小说的,但是因为网站的反爬技术,以及 node 技术不完善导致了只是爬取了1531个文章的 url 地址,保存在了 url 文件夹中,这次爬虫也算是以失败告终吧。

// 发起 http 请求
const request = require('superagent')
// 解析 html
const cheerio = require('cheerio')
// 写入文件
const fs = require('fs')

function getData() {
   request.get('https://doupocangqiong1.com/1/list_piaotian/').end((err, res) => {
      if(err) console.log('数据请求失败')
      // console.log(res.text);

      const $ = cheerio.load(res.text);
      const url = 'https://doupocangqiong1.com'
      $('.dirlist li a').each(function() {
         // console.log(url + $(this).attr("href"))
         var Url = url + $(this).attr("href")
         // console.log(Url); // 这里拿到所有的网址

         const time = new Date().valueOf();
         // .writeFile 方法有三个参数: 写入文件的目标地址及文件命名 , 文件内容 , 回调函数
         fs.writeFile("./url/斗破苍穹" + time + ".txt", Url, function(error) { // 将所有爬取到的url地址全部写入文件内
            if(error) console.log('文件写入失败')
            console.log('文件写入成功')
         })
      })
   })
}
getData()
