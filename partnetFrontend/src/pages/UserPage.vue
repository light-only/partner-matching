<template>
  <van-cell title="昵称" is-link :value="user?.userName" @click="handleClick('userName',user?.userName)" />
  <van-cell title="账号"  :value="user?.userAccount" />
  <van-cell title="头像" arrow-direction="down" @click="handleClick('avatarUrl',user?.avatarUrl)">
    <img style="height: 48px;margin-right: 10px" :src="user?.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link  :value="user?.gender" @click="handleClick('gender',user?.gender)">
    <div v-if="user?.gender ===0">男</div>
    <div v-if="user?.gender ===1">女</div>
  </van-cell>
  <van-cell title="电话" is-link :value="user?.phone" @click="handleClick('phone',user?.phone)"/>
  <van-cell title="邮箱"  :value="user?.email" />
  <van-cell title="星球编号"  :value="user?.planetCode" />
  <van-cell title="注册时间"  :value="user?.createTime" />

</template>

<script setup lang="ts">
import router from '../router/index'
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, showToast} from "vant";

const user = ref();
onMounted(async ()=>{
  const res = await myAxios.get('/api/user/currentUser');
  user.value = res.data;
})


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
