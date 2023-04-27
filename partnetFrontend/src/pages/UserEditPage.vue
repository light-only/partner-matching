<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-if="editorUser.editKey === 'userName'"
          v-model="userName"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
          v-if="editorUser.editKey === 'avatarUrl'"
          v-model="avatarUrl"
          name="头像"
          label="头像"
          placeholder="头像"
          :rules="[{ required: true, message: '请上传头像' }]"
      >
        <template #input>
          <van-uploader
              :max-count="1"
              v-model="fileList" multiple />
        </template>

      </van-field>

      <van-field
          v-if="editorUser.editKey === 'gender'"
          v-model="gender"
          is-link
          readonly
          name="picker"
          label="性别"
          placeholder="点击选择性别"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
          v-if="editorUser.editKey === 'phone'"
          v-model="phone"
          type="phone"
          name="电话"
          label="电话"
          placeholder="电话"
          :rules="[{ required: true, message: '请填写电话' }]"
      />
    </van-cell-group>
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
  const showPicker = ref(false);
  const columns = [
    { text: '男', value: 0 },
    { text: '女', value: 1 },
  ];

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
    currentValue:route.query.currentValue
  })
  const fileList = ref([
    {
      url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
  ]);
  const onSubmit = async() => {
    showToast('sadjfdjafk')
    let obj = {
      id:'1645710358315872258',
      [editorUser.value.editKey]:editorUser.value.currentValue
    }
   const res = await myAxios.post('/api/user/update',{...obj});
   console.log(res,'更新请求');
   if(res.data.code === 0 && res.data.data>0){
     showSuccessToast('修改成功');
   }else {
     showFailToast('修改失败');
   }

  };
</script>

<style>

</style>
