<template>
  <div>
      <h1>{{ message }}</h1>
      <button @click="btnClick">按钮</button>
      <h2 class="title">{{ name }}</h2>
      <!-- 3.使用 -->
      <Cpn />
   </div>
</template>

<script>
// 1.导入组件
import Cpn from './Cpn'
export default {
   components: {
      // 2.注册
      Cpn
   },
   data() {
      return {
         message: 'sxw',
         name: 'iu'
      }
   },
   methods: {
      btnClick() {
         console.log('1111')
      }
   }
}
</script>

<style scoped>
   .title{
      color: blue;
   }
</style>