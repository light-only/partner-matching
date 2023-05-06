<template>
  <div id="teamPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="result"
            is-link
            name="datePicker"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" v-model="addTeamData.expireTime" @cancel="showPicker = false" />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>

import router from "../router/index";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";
import {useRoute} from 'vue-router'
import moment from "moment";

const route = useRoute();


const initFormData = {
  "name": "",
  "description": "",
  "expireTime": [],
  "maxNum": 0,
  "password": "",
  "status": 0,
  "userId": 0
}
const addTeamData = ref({...initFormData});

const result = ref('');
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join('/');
  showPicker.value = false;
};
const id = route.query.id;
onMounted(async ()=>{
  if(id <= 0){
    showFailToast("队伍加载失败，请刷新");
    return;
  }
  const res = await myAxios.get('api/team/get',{
    params:{
      id
    }
  });
  if(res?.code === 0){
    console.log(res.data,'++++')
    addTeamData.value = res.data;
    addTeamData.value.status = res.data.status.toString();
    addTeamData.value.expireTime = moment(res.data.expireTime).format("yyyy-MM-DD").split('-');
    result.value =res.data.expireTime.join('/');
  }else {
    showFailToast("加载队伍失败，请重试");
  }
})

//提交
const onSubmit = async () => {
  let obj = await getCurrentUser();
  const postData = {
    ...addTeamData.value,
    expireTime: addTeamData.value.expireTime.join('-'),
    status: Number(addTeamData.value.status),
    userId:obj.id
  }
  debugger
  //todo 前端数据校验
  const res = await myAxios.post("api/team/update",postData);
  if (res?.code === 0 && res.data){
    showSuccessToast("更新成功");
    router.push({
      path:'/team',
      replace:true,
    });
  }else {
    showFailToast("更新失败")
  }
}



</script>

<style scoped>

</style>
