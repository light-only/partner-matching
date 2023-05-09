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
      <van-button v-if="item.userId !== currentUser?.id && item.hasJoin === false"  size="mini" type="primary" @click="joinTeam(item)">加入队伍</van-button>
      <van-button v-if="item.userId !== currentUser?.id && item.hasJoin === true" size="mini" type="warning" @click="quitTeam(item.id)">退出队伍</van-button>
      <van-button v-if="item.userId == currentUser?.id" size="mini" type="danger" @click="deleteTeam(item.id)">解散队伍</van-button>
      <van-button v-if="item.userId == currentUser?.id" size="mini" type="success" @click="updateTeam(item.id)">更新队伍</van-button>
    </template>
  </van-card>

  <van-dialog v-model:show="show" title="队伍密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
    <van-field v-model="password" type="password" label="密码" />
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from '../models/team'
import moment from "moment";
import {defineEmits, defineProps, onMounted, ref, withDefaults} from "vue";
import {getCurrentUser} from "../services/user";
import router from "../router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const currentUser = ref({});

const emit = defineEmits('getTeamList');
const params = ref({
  id:'',
  password:''
})

const show = ref(false);
const password = ref();

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
const joinTeam = async (team)=>{
  params.value.id = team.id;
  if(team.status === 2){
    show.value = true;
  }else {
    show.value = false;
    params.value.password = undefined;
    getData(params.value);
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
    emit('getTeamList');
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
    id:id
  });
  if(res?.code === 0){
    showSuccessToast("解散成功");
    emit('getTeamList');
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
/**
 * 确认密码弹窗
 */
const doJoinTeam = () =>{
  params.value.password = password.value;
  getData(params.value);
}
/**
 * 取消密码弹窗
 */
const doJoinCancel = () =>{
  params.value.password = undefined;
  show.value = false;
}

/**
 * 获取列表数据
 */
const getData = async (params) =>{
  const res = await myAxios.post('api/team/join',{
    teamId:params.id,
    password:params.password
  });
  if(res?.code === 0){
    showSuccessToast("加入成功");
    emit('getTeamList');
  }else {
    showFailToast("加入失败" + (res.description ? `， ${res.description} `:''));
  }
}
</script>

<style>

</style>
