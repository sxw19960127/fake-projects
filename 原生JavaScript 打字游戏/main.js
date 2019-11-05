;
window.onload = function () {
   function $(idName) {
      return document.getElementById(idName);
   }
   var gameStart = $('gameStart');
   var start = $('start');
   var describe = $('describe');
   var des = $('des');
   var cl = $('cl');
   var game = $('game');
   var oprate = $('oprate');
   var close = $('close');






   var selFir = select.firstElementChild;
   // 获取游戏界面的高度和宽度
   var gameH = getStyle(gameStart, "height");
   var gameW = getStyle(gameStart, "width");

   // 定时器和所有字母元素和默认游戏难度是3
   var c, letterEles, level = 3,
      letters = '',
      score = 0,
      accu = '0%',
      s = 0,
      count = 0,
      startTimeStamp = null,
      endTimeStamp = null;

   // 点击开始游戏，隐藏游戏开始界面，显示进入游戏界面
   start.onclick = function () {
      gameStart.style.display = "none";
      game.style.display = "block";
   }

   // 如果用户浏览器不支持document.getElementsByclassName这个方法的话，就使用下面这个我们封装的方法
   if (!document.getElementsByClassName) {
      document.getElementsByName = function (clsName) {
         var all = document.all;
         var all = [];
         for (var i = 0; i < all.length; i++) {
            Array.push(all[i]);
         }
         return all;
      }
   }

   // 退出，使用了事件委托，将事件全部都委托到父元素上
   oprate.onclick = function (event) { // 目标元素event
      // 事件的兼容处理
      var e = event || window.event;
      var target = e.srcElement || e.target;
      // 退出
      if (target.className === 'exit') {
         gameStart.style.display = "block";
         game.style.display = "none";
      }
      // 设置
      if (target.className == 'set') {
         select.style.display = 'block';
      }

      // 进入游戏界面之后的开始游戏和暂停游戏
      // 如果用户点击了开始按钮
      if (target.className === 'start') {
         target.innerHTML = target.innerHTML == "开始" ? "暂停" : '开始';


         // 游戏的暂停
         if (target.innerHTML == '开始') {
            oprate.lastElementChild.style.cursor = 'pointer';
            clearInterval(c);
            // c恢复成原来的初始值
            c = undefined;

            // 清除所有字母元素上的定时器
            clearAllLetters();
         } else {
            oprate.lastElementChild.style.cursor = 'not-allowed';
            // 游戏的开始

            // bug注意: 当我们反复点击开始暂停按钮的时候,需要判断当前是否已经存在定时器了，已经存在就不再开启了，防止开启多个定时器之后页面卡死
            if (c) {
               return;
            }

            startTimeStamp = new Date() * 1;

            // 设置定时器，每隔0.5s下落一个文字
            c = setInterval(function () {
               endTimeStamp = new Date() * 1;
               if (endTimeStamp - startTimeStamp <= 60 * 1000) {
                  tip.children[2].firstElementChild.innerHTML = score;
               } else {
                  tip.children[2].firstElementChild.innerHTML = Math.ceil(score / Math.ceil((endTimeStamp - startTimeStamp) / (60 * 1000)));
               }

               createLetter();
               console.log(letters);
               // 拿到所有字母所在的元素
               letterEles = document.getElementsByClassName('active'); //防止通过className获取到的方式不兼容所有浏览器,上面进行兼容处理
            }, level * 1000)

            // 调用暂停后继续游戏运动,暂停之后的开始游戏
            gameStarts();
            // 500 控制当前游戏界面显示字母的多少
         }
      }

      // 处理结束游戏
      if (target.className == 'finish') {
         finished();
      }

      // 处理退出游戏
      if (target.className == 'exit') {
         // 首先处理结束游戏
         finished();
         // 显示游戏开始的界面，隐藏进入游戏的界面
         game.style.display = 'none';
         gameStart.style.display = 'block';
      }

   }

   document.onkeyup = function (evt) {
      var e = evt || window.event;
      var codeVal = e.keyCode;
      console.log(codeVal);
      if (codeVal >= 65 && codeVal < 90) {
         count++;
      }
      // 根据键值找到对应的字符
      var char = keyVal[codeVal];

      if (char) {
         var index = letters.search(eval('/' + char + "/gi"));



         if (index != -1) {
            game.removeChild(letterEles[index]);

            var exp = eval('/' + char + '/gi');
            letters = letters.replace(exp, '');

            // score ++;
            tip.firstElementChild.firstElementChild.innerHTML = ++score;
            endTimeStamp = new Date() * 1;
            if (endTimeStamp - startTimeStamp <= 60 * 1000) {
               tip.children[2].firstElementChild.innerHTML = score;
            } else {
               tip.children[2].firstElementChild.innerHTML = Math.ceil(score / Math.ceil((endTimeStamp - startTimeStamp) / (60 * 1000)));
            }
         }

         // 实现正确率
         tip.children[1].firstElementChild.innerHTML = (score / count * 100).toFixed(2) + '%'

      }
      // console.log(char)




   }



   // 点击说明按钮显示游戏说明
   describe.onclick = function () {
      des.style.display = 'block';
   }
   // 鼠标经过提示区域的时候，关闭按钮的交互行为
   // 鼠标移入时候显示
   des.onmouseover = function () {
      cl.style.display = 'block';
   }
   // 鼠标移除时候隐藏
   des.onmouseout = function () {
      cl.style.display = 'none';
   }
   // 关闭游戏说明内容
   cl.onclick = function () {
      des.style.display = 'none';
   }
   // 游戏难度的关闭按钮的交互事件
   select.onmouseover = function () {
      close.style.display = 'block';
   }
   select.onmouseout = function () {
      close.style.display = 'none';
   }
   // 点击关闭设置游戏难度的按钮
   close.onclick = function () {
      select.style.display = "none";
      level = selFir.value;
   }

   // 创建下落字母的封装函数
   function createLetter() {
      var span = document.createElement('span');
      // 赋予样式
      span.className = 'active'

      var l = randLetter();
      span.innerHTML = l;
      letters += l;

      span.style.left = Math.floor(Math.random() * (gameW - 30)) + 'px';
      span.style.background = randBg();
      game.appendChild(span); // 创建完成之后追加到游戏界面中
      // 字母运动执行以下
      startMove(span, gameH, "top");
   }

   // 封装函数，随机产生字母
   function randLetter() {
      var str = "abcdefghijklmnopqrstuvwxyz";
      str += str.toUpperCase();
      return str.charAt(Math.floor(Math.random() * str.length));
   }

   // 生成16进制随机颜色值
   function randBg() {
      var str = '0123456789abcdef';
      var colorVal = '#';
      for (var i = 0; i < 6; i++) {
         colorVal += str.charAt(Math.floor(Math.random() * str.length));
      }
      return colorVal;
   }

   // 封装函数，获取到元素使用样式的最终值，保证兼容
   function getStyle(ele, attr) {
      var res = null; // 定义变量，用以保存最终获取到的数值
      if (ele.currentStyle) { // 如果浏览器支持currentStyle这个属性的话
         res = ele.currentStyle[attr];
      } else {
         res = window.getComputedStyle(ele, null)[attr];
      }
      return parseFloat(res);
   }
   // 封装运动函数: 运动的元素 运动到的最终值 运动元素的属性
   function startMove(ele, end, attr) {
      // 控制字母落下速度的快慢
      var speed = 0.5 + score / 100;
      ele.timer = setInterval(function () {
         // 获取到当前元素的运动值
         var moveVal = getStyle(ele, attr);
         if (moveVal >= end) { // 30表示物体自身的高度
            // 当物体从上自下，落下的高度是屏幕高度+自身高度的时候
            clearInterval(ele.timer);
            // 删除元素，防止长时间页面卡死
            game.removeChild(ele);

            letters = letters.replace(ele.innerHTML, '');
         } else {
            ele.style[attr] = moveVal + speed + 'px';
         }
      }, 10)


   }


   // 封装函数，清除掉所有字母所在元素的定时器
   // 点击暂停，元素实现停留
   function clearAllLetters() {
      for (var i = 0; i < letterEles.length; i++) {
         clearInterval(letterEles[i].timer);
      }
   }

   // 暂停之后的开始游戏
   function gameStarts() {
      // 因为在调用这个函数的时候由于定义的letterEles还没有赋值,是undefined,所以我们这边进行以下判断
      if (!letterEles) return;
      for (var i = 0; i < letterEles.length; i++) {
         startMove(letterEles[i], gameH, "top");
         // 在游戏开始的时候调用
      }
   }

   // 结束游戏
   function finished() {
      // 清除单位时间内产生字母的定时器
      clearInterval(c);
      c = undefined;
      score = 0;
      s = 0;
      accu = "0%";
      tip.children[0].firstElementChild.innerHTML = score;
      tip.children[1].firstElementChild.innerHTML = accu;
      tip.children[2].firstElementChild.innerHTML = s;

      // 删除所有的字母
      for (var i = letterEles.length - 1; i >= 0; i--) {
         // 从父元素开始查找
         game.removeChild(letterEles[i]);
      }
      if (oprate.firstElementChild.innerHTML == '暂停') {
         oprate.firstElementChild.innerHTML = '开始'
      }
   }

   // 测试
   // startMove(letter, gameH, 'top');
}