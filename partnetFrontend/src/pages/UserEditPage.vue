<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="性别"
          label="性别"
          placeholder="性别"
          :rules="[{ required: true, message: '请填写性别' }]"
      />
      <van-field
          v-model="password"
          type="password"
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
  import {ref} from 'vue';
  const username = ref('');
  const password = ref('');
  const onSubmit = (values) => {
    console.log('submit', values);
  };
</script>

<style>

</style>
