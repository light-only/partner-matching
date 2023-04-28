<template>
  <user-card-list :userList="userList"></user-card-list>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {useRoute} from "vue-router";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";
  const route = useRoute();

  const {tags} = route.query;
//存放用户列表
const userList = ref([]);

//异步调用
onMounted ( async ()=>{
  const userListData = await myAxios.get('/api/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: function(params){
        return qs.stringify(params,{indices: false})
      }
    }
  })
      .then(function (response){
        showSuccessToast('请求成功!');
        return response?.data;
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
