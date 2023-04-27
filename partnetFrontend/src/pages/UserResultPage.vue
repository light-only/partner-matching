<template>
  <van-card
      v-for="(mockUser,index) in userList"
      :key="index"
      :desc="mockUser.profile"
      :title="mockUser.userName + mockUser.planetCode"
      :thumb="mockUser.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in mockUser.tags" style="margin-right:8px;margin-top: 8px">{{tag}}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="linkMine">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {useRoute} from "vue-router";
import qs from 'qs'
  const route = useRoute();

  const {tags} = route.query;

const userList = ref([]);//存放用户列表
const linkMine = ()=>{
  showToast('联系我');
}

onMounted ( async ()=>{     //异步调用
  const userListData = await myAxios.get('/api/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: function(params){
        // return qs.stringify(params,{arrayFormat:'repeat'})
        return qs.stringify(params,{indices: false})
      }
    }
  })
      .then(function (response){
        console.log('/user/search/tags succeed',response);
        showSuccessToast('请求成功!');
        return response?.data;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
      })
      .catch(function (error){
        console.error('/user/search/tags error',error);
        showFailToast('请求失败!');
      })
  // console.log(userListData)
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
