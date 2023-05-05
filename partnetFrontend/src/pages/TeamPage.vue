<template>
  <team-card-list :teamList="teamList"></team-card-list>
  <van-button type="primary" @click="toAddPage">创建队伍</van-button>
</template>

<script setup>
import {ref} from 'vue'
import router from '../router/index'
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const toAddPage = ()=>{
  router.push({
    path:'/team/add'
  })
}

const teamList = ref([]);
onMounted(async ()=>{
  const res = await myAxios.get('api/team/list');
  if(res?.code===0){
    teamList.value = res.data;
  }else {
    showFailToast("加载队伍失败，请刷新");
  }
})

</script>

<style>

</style>
