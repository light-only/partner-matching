<template>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="300"
    >
      <user-card-list :userList="userList"></user-card-list>
    </van-list>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
//存放用户列表
const userList = ref([]);
const userListData = ref([]);
const total = ref(0);
const params = ref({
  pageNum:1,
  pageSize:10
})
const onLoad = () =>{
  getList(params.value);
  params.value.pageNum++;
};

onMounted (  ()=>{     //异步调用
  // getList(params.value);
});
const getList = async (params)=>{
  const res = await myAxios.get('/api/user/recommend',{
    params
  });
  if (res.data.records.length === 0) {
    userList.value = [];
    finished.value = true;
  }
  // 若数据条数不等于0
  total.value = res.data.total;
  userListData.value.push(...res.data.records);
  loading.value = false;
  // 如果list长度大于等于总数据条数,数据全部加载完成
  if (userListData.value.length >= total.value) {
    finished.value = true;
  }
  if(userListData.value){
    userListData.value.forEach(user => {
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData.value;
  }
}
</script>

<style>

</style>
