<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <team-card-list :teamList="teamList" @getTeamList="getTeamList"></team-card-list>
  <van-empty v-if="teamList.length<1" description="暂无数据" />
</template>

<script setup>
import {ref} from 'vue'
import router from '../router/index'
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";

const value = ref('');
const onSearch =  (val) => {
  getTeamList(val);
}
const onCancel = () => {
  getTeamList();
}
const toAddPage = ()=>{
  router.push({
    path:'/team/add'
  })
}

const teamList = ref([]);
onMounted( ()=>{
  getTeamList();
})

const getTeamList = async (val='')=>{
  const res = await myAxios.get('api/team/list/my/join',{
    params:{
      searchText:val,
      pageNum:1
    }
  });
  if(res?.code===0){
    teamList.value = res.data;
  }else {
    showFailToast("加载队伍失败，请刷新");
  }
}

</script>

<style>

</style>
