<template>
  <van-cell title="昵称" is-link :value="user?.userName" @click="handleClick('userName','昵称',user?.userName)" />
  <van-cell title="账号"  :value="user?.userAccount" />
  <van-cell title="头像" arrow-direction="down" @click="handleClick('avatarUrl','头像',user?.avatarUrl)">
    <img style="height: 48px;margin-right: 10px" :src="user?.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link  :value="user?.gender" @click="handleClick('gender','性别',user?.gender)">
    <div v-if="user?.gender ===0">男</div>
    <div v-if="user?.gender ===1">女</div>
  </van-cell>
  <van-cell title="电话" is-link :value="user?.phone" @click="handleClick('phone','电话',user?.phone)"/>
  <van-cell title="邮箱"  :value="user?.email" />
  <van-cell title="星球编号"  :value="user?.planetCode" />
  <van-cell title="注册时间"  :value="user?.createTime" />

</template>

<script setup lang="ts">
import router from '../router/index'
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {getCurrentUser} from "../services/user";

const user = ref();
const id = ref("");
onMounted(async ()=>{
  const res = await getCurrentUser();
  if(res){
    user.value = res;
    user.value.createTime = new Date(res.createTime).toString();
    showSuccessToast('获取用户信息成功');
  }else {
    showFailToast('获取用户信息失败');
  }

})


const handleClick= (editKey:string,editName:string,currentValue:any)=>{
  router.push({
    path:'/edit',
    query:{
      id:id.value,
      editKey,
      editName,
      currentValue
    }
  })
}
</script>

<style>

</style>
