// 1.使用 CommonJS 的规范
const { add, mul } = require('../src/js/a')

console.log(add(1,2));
console.log(mul(2,3));

// 2.使用 ES6 的开发规范
import {name, age} from '../src/js/info'

console.log(name)
console.log(age)

// 3.依赖 css 文件
require('./css/normal.css')

// 4.依赖 less 文件
require('./css/special.less')

document.writeln('<h1>一年三班，流川枫</h1>')

// 5.使用 vue 进行开发
import Vue from 'vue' // 当from后面没有跟上路径,而是直接跟上名称的时候,就会直接去node_modules中去找
// 这里直接 new Vue就可以了

// 定义组件
// const App = {
//    template: `
//    <div>
//       <h1>{{ message }}</h1>
//       <button @click="btnClick">按钮</button>
//       <h2>{{ name }}</h2>
//    </div>
//    `,
//    data() {
//       return {
//          message: 'sxw',
//          name: 'iu'
//       }
//    },
//    methods: {
//       btnClick() {
//          console.log('1111')
//       }
//    }
// }
// import App from './vue/app'
import App from './vue/App.vue'
new Vue({
   el: '#app',
   // 注意: 当既有el 又有template的时候,我们在template中书写的代码会全部都替换到el所控制的代码段中,注意是覆盖替换
   template: '<App />',
   components: {
      // 注册局部组件
      App
   }
})

document.writeln('<h1>李智恩</h1>')