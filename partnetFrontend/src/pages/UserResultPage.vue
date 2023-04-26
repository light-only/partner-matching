<template>
  <van-card
      :desc="mockUser.profile"
      :title="mockUser.userName + mockUser.planetCode"
      :thumb="mockUser.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in mockUser.tags" style="margin-right:8px;margin-top: 8px">{{tag}}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute} from "vue-router";
import qs from 'qs'
  const route = useRoute();

  const {tags} = route.query;

  const mockUser = ref(
    {
      id:1,
      userName:"张三",
      userAccount: 'zhangsan',
      tags:['java','pyton'],
      planetCode: '12323',
      avatarUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
      profile:'这是一个全栈工程师的开发过程介绍！'
    }
  )

onMounted(()=>{
  // Make a request for a user with a given ID
  myAxios.get('/api/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer:{
      serialize: params => {
        return qs.stringify(params,{arrayFormat:'repeat'})
      }
    }
  })
      .then(function (response) {
        console.log('/api/user/search/tags succeed',response);
        showSuccessToast('请求成功')
      })
      .catch(function (error) {
        console.error('/api/user/search/tags error',error);
        showFailToast('请求失败');
      })
})

</script>

<style>

</style>
