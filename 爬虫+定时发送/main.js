// 2.引入 superagent 包,用于服务器发送http请求
const request = require('superagent');
// 3.导入 cheerio,把字符串解析成 html
const cheerio = require('cheerio')
// 4.导入模板引擎
const template = require('art-template')
// 5.导入 path 模块,处理路径
const path = require('path')


// 1.计算起始的天数
function getDayDate() {
   return new Promise((resolve, reject) => {
      // 现在的时间
      const today = new Date();
      // 目标时间 1996-01-27
      const meet = new Date('1996-01-27');
      // console.log(today - meet); // 毫秒值
      const count = Math.ceil((today - meet) / 1000 / 60 / 60 / 24);
      // 今天日期格式化
      const format = today.getFullYear() + ' / ' + (today.getMonth() + 1) + ' / ' + today.getDate();

      const dayData = {
         count,
         format
      }
      // console.log(dayData);
      resolve(dayData) // 通过Promise回调函数的resolve方法将数据暴露出去
   })
}
// getDayDate();

// 2.0.1 请求墨迹天气获取数据
function getMojiData() {
   return new Promise((resolve,reject) => {
      request.get('https://tianqi.moji.com/weather/china/zhejiang/jinhua').end((err, res) => {
         if(err) console.log('数据请求失败,请检查路径');
         // console.log(res.text); // 返回源码字符串
   
         // 把字符串解析成html,并用 jQuery 选择器获取到内容
         const $ = cheerio.load(res.text);
         // 图标
         const icon = $('.wea_weather span img').attr('src')
         // 天气
         const weather = $('.wea_weather b').text()
         // 温度
         const temperature = $('.wea_weather em').text()
         // console.log(temperature)
         // 提示
         const tips = $('.wea_tips em').text()
   
         const mojiData = {
            icon,
            weather,
            temperature,
            tips
         }
         // console.log(mojiData)
         resolve(mojiData)
      })
   })
}
// getMojiData();

// 3.请求 one 页面的抓取数据
function getOneData() {
   return new Promise((resolve, reject) => {
      request.get('http://wufazhuce.com/').end((err, res) => {
         if(err) console.log('请求失败...')
         // 成功的话首先将返回值中的页面解析成 html
         const $ = cheerio.load(res.text)
         // 抓取 one 的图片
         const img = $('.carousel-inner>.item>img, .carousel-inner>.item>a>img').eq(0).attr('src')
         // 抓取 one 的文本
         const text = $('.fp-one .fp-one-cita-wrapper .fp-one-cita a').eq(0).text();
         const oneData = {
            img,
            text
         }
         // console.log(oneData)
         resolve(oneData)
      })
   })
}
// getOneData()

// 通过模板引擎替换 html 的数据
// 通过async和awiat实现函数按顺序进行执行
async function renderTemplate() {
   // 获取日期
   const dayData = await getDayDate();
   // 获取墨迹天气的数据
   const mojiData = await getMojiData();
   // 获取 One 的数据
   const oneData = await getOneData();

   console.log(dayData);
   console.log(mojiData);
   console.log(oneData);
   // 所有数据都获取成功之后,才进行模板引擎数据的替换
   return new Promise((resolve,reject) => {
      const html = template(path.join(__dirname, './index.html'), {
         // test: '测试'
         dayData,
         mojiData,
         oneData
      })
      // console.log(html)
      resolve(html)
   })
   
}
// renderTemplate();


// 以下代码摘自 https://nodemailer.com/about/ 用以发邮件
// "use strict";
// 导入发送邮件的包
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
   //  host: "smtp.ethereal.email",
   //  port: 587,
    // secure: false, // true for 465, false for other ports
   //  auth: {
      // user: testAccount.user, // generated ethereal user
      // pass: testAccount.pass // generated ethereal password
   //  }
//   });

  // send mail with defined transport object
//   let info = await transporter.sendMail({
    //from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //to: "bar@example.com, baz@example.com", // list of receivers
    //subject: "Hello ✔", // Subject line
    //text: "Hello world?", // plain text body
    //html: "<b>Hello world?</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
// main();

// 5.发送邮件
// 因为上述代码都是英文的,不便理解,所以下面自己改写一下
async function sendNodeMail() {
   // HTML 页面内容，通过 await 等待模板引擎渲染完毕之后,再往下执行代码
   const html = await renderTemplate();
   console.log(html);
   // 使用默认SMTP传输,创建可重用邮箱对象
   let transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // 开启加密协议,需要使用 465 端口号
      auth: {
         user: 'sxw19960127@163.com', //用户名
         pass: 'sxw19960127' //授权密码,去到163邮箱,设置,POP3/SMTP/IMAP,将POP3/SMTP服务和IMAP/SMTP服务勾选上;然后在左边的客户端授权密码,设置客户端授权码: 开启,然后按照提示完成下面步骤即可.
      }
   });

   // 设置电子邮件数据
   let mailOptions = {
      from: '"流川枫"<sxw19960127@163.com>', //发件人邮箱,与用户名保持一致
      to: "1183476700@qq.com", // 收件人列表
      subject: '问候的邮箱', // 标题
      html: html // html内容
   };

   transporter.sendMail(mailOptions, (error, info ={}) => {
      if(error) {
         console.log(error);
         sendNodeMail(); // 再次发送,有些时候可能因为网络的原因会导致发送失败
      }
      console.log('邮件发送成功', info.messageId);
      console.log('静等一下发送');
   });
}
// sendNodeMail();

// 6.定时每天5；00发送邮件
// 导入定时任务模块包
var schedule = require('node-schedule');
// 创建定时任务                 21点的11分14秒发送
var j = schedule.scheduleJob('00 10 22 * * *', function(){
   sendNodeMail();   
   console.log('定时任务的邮件发送成功');
});