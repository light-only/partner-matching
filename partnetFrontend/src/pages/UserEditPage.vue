<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editorUser.currentValue"
        :name="editorUser.editKey"
        :label="editorUser.editName"
        :placeholder="`请输入${editorUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
  import myAxios from "../plugins/myAxios.ts";
  import {ref} from 'vue';
  import {useRoute} from "vue-router";
  import {showFailToast, showSuccessToast, showToast} from "vant";
  import router from "../router/index.ts";
  import {getCurrentUser} from "../services/user.ts";
  const showPicker = ref(false);

  const onConfirm = ({ selectedOptions }) => {
    gender.value = selectedOptions[0]?.text;
    showPicker.value = false;
  };
  const route = useRoute();
  const userName = ref('');
  const phone = ref('');
  const gender = ref('');
  const avatarUrl = ref('');
  const editorUser = ref({
    editKey : route.query.editKey,
    editName:route.query.editName,
    currentValue:route.query.currentValue,
  })
  const fileList = ref([
    {
      url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
  ]);
  const onSubmit = async() => {
    //获取用户信息
    const currentUser =await getCurrentUser();
    if(!currentUser){
      showFailToast("用户未登录");
      router.replace('/');
      return;
    }
    debugger
    let obj = {
      id:currentUser.id,
      userRole:currentUser.userRole,
      [editorUser.value.editKey]:editorUser.value.currentValue
    }
   const res = await myAxios.post('/api/user/update',{...obj});
   if(res.code === 0 && res.data>0){
     showSuccessToast('修改成功');
     router.back();
   }else {
     showFailToast('修改失败');
   }

  };
</script>

<style>

</style>
