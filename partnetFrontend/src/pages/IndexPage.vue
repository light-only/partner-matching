<template>
  <user-card-list :userList="userList" ref="homeRef"></user-card-list>
</template>

<script setup>
import {onMounted, ref,watch} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import useScroll from "../components/ScrollPage.vue"

const homeRef = ref();
const params = ref({
  pageNum:1,
  pageSize:10
})

//监听页面是否到达底部
const { isReachBottom, scrollTop } = useScroll(homeRef)

watch(isReachBottom, (newVal) => {
  if (newVal) {
    params.value = {
      ...params,
      pageNum: ++pageNum
    }
    getList(params.value);
    isReachBottom.value = false;
  }
})

const userList = ref([]);//存放用户列表

onMounted (  ()=>{     //异步调用
  getList(params.value);
});
const getList = async (params)=>{
  const userListData = await myAxios.get('/api/user/recommend',{
    params
  }).then(function (response){
    return response?.data.records;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
  }).catch(function (error){
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
}
</script>

<style>

</style>
