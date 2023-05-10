<template>
  <van-cell title="昵称" is-link :value="user?.userName" @click="handleClick('userName','昵称',user?.userName)" />
  <van-cell title="账号"  :value="user?.userAccount" />
  <van-cell title="头像" arrow-direction="down" @click="handleClick('avatarUrl','头像',user?.avatarUrl)">
    <img style="height: 48px;margin-right: 10px" :src="user?.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link  :value="user?.gender" @click="handleClick('gender','性别',user?.gender)">
    <div v-if="user?.gender ===0">男</div>
    <div v-if="user?.gender ===1">女</div>
  </van-cell>
  <van-cell title="电话" is-link :value="user?.phone" @click="handleClick('phone','电话',user?.phone)"/>
  <van-cell title="邮箱" is-link @click="handleClick('email','邮箱',user?.email)"  :value="user?.email" />
  <van-cell title="星球编号"  :value="user?.planetCode" />
  <van-cell title="注册时间"  :value="user?.createTime" />
  <van-cell title="我创建的队伍"  is-link  to="/team/create"/>
  <van-cell title="我加入的队伍"  is-link  to="team/join" />
  <div class="layout-button">
    <van-button  color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="layoutUser">退出登录</van-button>
  </div>

</template>

<script setup lang="ts">
import router from '../router/index'
import {onMounted, ref,onActivated,watch} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {getCurrentUser} from "../services/user";
import moment from "moment";

const user = ref();
const id = ref("");
onMounted( ()=>{
  // getUserInfo();
})

watch(()=>router.currentRoute.value,(newValue:any)=>{
  if(newValue){
    getUserInfo();
  }
},{immediate:true})

 function getUserInfo (){
  //获取用户信息
   getCurrentUser().then(res=>{
     if(res){
       user.value = res;
       //格式化时间，使用moment插件
       user.value.createTime = moment(res.createTime).format("YYYY-MM-DD");
     }else {
       showFailToast('获取用户信息失败');
     }
   })

}

// getUserInfo();

/**
 * 跳转到修改用户信息页面
 * @param editKey
 * @param editName
 * @param currentValue
 */
const handleClick= (editKey:string,editName:string,currentValue:any)=>{
  router.push({
    path:'/edit',
    query:{
      id:id.value,
      editKey,
      editName,
      currentValue
    }
  })
}
/**
 * 退出登录
 */
const layoutUser = async () =>{
  const res = await myAxios.post("api/user/logout");
  if(res?.code === 0){
    router.replace('/login');
  }else {
    showFailToast("退出失败，请刷新后重试");
  }
}
</script>

<style scoped>
.layout-button {
  padding: 20px;
}

</style>
