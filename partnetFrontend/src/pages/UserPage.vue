<template>
  <van-cell title="昵称" is-link :value="user.username" />
  <van-cell title="账号" is-link :value="user.userAccount" />
  <van-cell title="头像"  arrow-direction="down" >
    <img style="height: 48px" :src="user.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link  :value="user.gender" @click="handleClick('gender',user.gender)">
    <div v-if="user.gender ===0">男</div>
    <div v-if="user.gender ===1">女</div>
  </van-cell>
  <van-cell title="电话" is-link :value="user.phone" @click="handleClick('phone',user.phone)"/>
  <van-cell title="邮箱"  :value="user.email" />
  <van-cell title="星球编号" is-link :value="user.planetCode" />
  <van-cell title="注册时间" is-link :value="user.createTime" />

</template>

<script setup lang="ts">
import router from '../router/index'
const user = {
  id:1,
  username:'张三',
  userAccount:'zhangsan',
  avatarUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  gender:1,
  phone:'18836587032',
  email:'1480418689@qq.com',
  userStatus:1,
  userRole:1,
  planetCode:12,
  tags:['java','python'],
  createTime:'2023-05-06',
}

const handleClick= (editKey:string,currentValue:any)=>{
  router.push({
    path:'/edit',
    query:{
      editKey,
      currentValue
    }
  })
}

</script>

<style>

</style>
