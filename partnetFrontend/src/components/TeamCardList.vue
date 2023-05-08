<template>
  <van-card
      v-for="(item,index) in teamList"
      :key="index"
      :desc="item.description"
      :title="item.name"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  >
    <template #tags>
      <van-tag plain type="primary">{{item.status===0?"公开":item.status===1?'私密':'加密'}}</van-tag>
    </template>
    <template #bottom>
      <div>
        {{'最大人数' +" : " + item.maxNum}}
      </div>
      <div>
        {{'过期时间' + " : "+moment(item.expireTime).format("YYYY-MM-DD")}}
      </div>
      <div>
        {{'创建时间' +" : " +moment(item.createTime).format("YYYY-MM-DD")}}
      </div>
    </template>
    <template #footer>
      <van-button v-if="item.userId !== currentUser?.id && item.hasJoin === false"  size="mini" type="primary" @click="joinTeam(item.id)">加入队伍</van-button>
      <van-button v-if="item.userId !== currentUser?.id && item.hasJoin === true" size="mini" type="warning" @click="quitTeam(item.id)">退出队伍</van-button>
      <van-button v-if="item.userId == currentUser?.id" size="mini" type="danger" @click="deleteTeam(item.id)">解散队伍</van-button>
      <van-button v-if="item.userId == currentUser?.id" size="mini" type="success" @click="updateTeam(item.id)">更新队伍</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import {TeamType} from '../models/team'
import moment from "moment";
import {defineProps, onMounted, ref, withDefaults} from "vue";
import {getCurrentUser} from "../services/user";
import router from "../router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const currentUser = ref({});


onMounted(async ()=>{
  //页面挂载完成获取用户信息
  currentUser.value = await getCurrentUser();
})

/**
 * ts 声明父组件返回的数据类型
 */
interface TeamCardListProps{
  teamList:TeamType[]
}
const props = withDefaults(defineProps<TeamCardListProps>(),{
  teamList:[] as TeamType[]
})

/**
 * 加入队伍
 * @param id
 */
const joinTeam = async (id:number)=>{
  const res = await myAxios.post('api/team/join',{
    teamId:id
  });
  if(res?.code === 0){
      showSuccessToast("加入成功");
  }else {
    showFailToast("加入失败" + (res.description ? `， ${res.description} `:''));
  }
}
/**
 * 退出队伍
 * @param id
 */
const quitTeam = async (id)=>{
  const res = await myAxios.post('api/team/quit',{
    teamId:id
  });
  if(res?.code === 0){
    showSuccessToast("退出成功");
  }else {
    showFailToast("操作失败" + (res.description?`${res.description}`:''));
  }
}
/**
 * 解散队伍
 * @param id
 */
const deleteTeam = async (id)=>{
  const res = await myAxios.post('api/team/delete',{
    id
  });
  if(res?.code === 0){
    showSuccessToast("解散成功");
  }else {
    showFailToast("操作失败" + (res.description?`${res.description}`:''));
  }
}

/**
 * 跳转到更新队伍页面
 * @param id
 */
const updateTeam = (id)=>{
  router.push({
    path:'/team/update',
    query:{
      id
    }
  })

}
</script>

<style>

</style>
