<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>


<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from 'vue'
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, showToast} from "vant";
import router from "../router";
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
 const res = await myAxios.post('/api/user/login',{
   userAccount:userAccount.value,
   userPassword:userPassword.value
 });
  if(res.code === 0 && res.data){
    showSuccessToast('登录成功');
    const redirectUrl = route.query?.redirect?route.query.redirect:'/';
    window.location.href = redirectUrl;
  }else {
    showFailToast('登录失败');
  }
};

</script>
