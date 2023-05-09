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
  <div class="layout-button">
    <van-button class="add-button" icon="plus"  type="primary" block @click="toAddPage"></van-button>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="secret"></van-tab>
    </van-tabs>
  </div>
    <team-card-list :teamList="teamList" @getTeamList="getTeamList"></team-card-list>


</template>

<script setup>
import {ref} from 'vue'
import router from '../router/index'
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";
const active = ref(0);

const value = ref('');
const params = ref({
  pageNum:1,
  pageSize:10,
  status:0,
  searchText:''
})
/**
 * 切换队伍状态
 * @param title
 */
const onClickTab = ({ name }) => {
  if(name === 'public'){
      params.value.status = 0;
      getTeamList(params.value)
  }else {
    params.value.status = 2;
    getTeamList(params.value);
  }
};

const onLoad = () => {
  params.value.pageNum ++;
  getTeamList(params.value);
};
const onSearch =  (val) => {
  params.value.searchText = val;
  getTeamList(params.value);
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

const getTeamList = async (params) =>{
  const res = await myAxios.get('api/team/list',{
    params
  });
  if(res?.code===0){
    teamList.value = res.data;
  }else {
    showFailToast("加载队伍失败，请刷新");
  }
}

</script>

<style scoped>
.layout-button {
  padding: 0 10px;
}

</style>
