<template>
  <user-card-list :userList="userList"></user-card-list>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";


const userList = ref([]);//存放用户列表

onMounted ( async ()=>{     //异步调用
  const userListData = await myAxios.get('/api/user/recommend',{
    params: {
      pageSize:10,
      pageNum:1
    }
  })
      .then(function (response){
        showSuccessToast('请求成功!');
        return response?.data.records;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
      })
      .catch(function (error){
        showFailToast('请求失败!');
      })
  if(userListData){
    userListData.forEach(user => {
      if(user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
})
</script>

<style>

</style>
