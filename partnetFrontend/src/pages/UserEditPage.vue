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
    >
      <template #input  v-if="editorUser.editKey === 'avatarUrl'">
        <van-uploader v-model="imageValue" :max-count="1" />
      </template>
    </van-field>
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
  const imageValue = ref();
  /**
   * 确认选择性别选择器
   * @param selectedOptions
   */
  const onConfirm = ({ selectedOptions }) => {
    editorUser.value.currentValue = selectedOptions[0]?.text;
    showPicker.value = false;
  };

  /**
   * 判断是否显示弹窗
   * @param val
   */
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
    currentValue:route.query.editKey==='gender'?route.query.currentValue==1?"女":'男':route.query.currentValue,
  })
  const fileList = ref([
    {
      url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
  ]);

  /**
   * 提交表单
   * @returns {Promise<void>}
   */
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
      [editorUser.value.editKey]:editorUser.value.editKey==='gender'?editorUser.value.currentValue==='男'?0:1:editorUser.value.currentValue
    }
    let user = await getCurrentUser();
    let user1 = {
      ...user,
      ...obj
    };
    setCurrentUserState(user1);
   const res = await myAxios.post('/api/user/update',{...obj});
   if(res.code === 0 && res.data>0){
     showSuccessToast('修改成功');
     router.replace('/user');
   }else {
     showFailToast('修改失败');
   }

  };
</script>

<style>

</style>
