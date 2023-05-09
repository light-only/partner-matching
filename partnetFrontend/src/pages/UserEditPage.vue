<template>
  <van-form @submit="onSubmit">
    <van-field
        :is-link="editorUser.editKey==='gender'?true:false"
        :readonly="editorUser.editKey==='gender'?true:false"
        v-model="editorUser.currentValue"
        :name="editorUser.editKey"
        :label="editorUser.editName"
        :placeholder="`请输入${editorUser.editName}`"
        @click="handleClick(editorUser.editKey)"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>
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
  import {showFailToast, showSuccessToast} from "vant";
  import router from "../router/index.ts";
  import {getCurrentUser} from "../services/user.ts";
  import {setCurrentUserState} from "../states/user.ts";
  const showPicker = ref(false);
  const columns = [
    { text: '男', value: 0 },
    { text: '女', value: 1 },
  ];


  const onConfirm = ({ selectedOptions }) => {
    editorUser.value.currentValue = selectedOptions[0]?.text;
    showPicker.value = false;
  };
  const handleClick = (val) =>{
    if(val === 'gender'){
      showPicker.value = true;
    }else {
      showPicker.value = false;
    }
  }
  const route = useRoute();
  const userName = ref('');
  const phone = ref('');
  const gender = ref('');
  const avatarUrl = ref('');
  const editorUser = ref({
    editKey : route.query.editKey,
    editName:route.query.editName,
    currentValue:route.query.editKey==='gender'?route.query.currentValue===1?"女":'男':route.query.currentValue,
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
    let obj = {
      id:currentUser.id,
      userRole:currentUser.userRole,
      [editorUser.value.editKey]:editorUser.value.currentValue
    }
    let user1 = {
      ...obj,
      currentUser:getCurrentUser()
    };
    setCurrentUserState(user1);
   const res = await myAxios.post('/api/user/update',{...obj});
    console.log(res,'res+++');
   if(res.code === 0 && res.data>0){
     showSuccessToast('修改成功');
     router.push('/user');
   }else {
     showFailToast('修改失败');
   }

  };
</script>

<style>

</style>
