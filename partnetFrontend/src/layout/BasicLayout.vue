<template>

  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
   <router-view/>
  </div>

  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
import {ref} from 'vue'
import {showToast} from "vant";
import router from "../router";
const onClickLeft = () => router.back();
const onClickRight = () => router.push('/search');

// const onChange=(index)=>showToast(`标签${index}`);
const active = ref('index');
</script>

<style scoped>
  #content {
    padding-bottom: 50px;
  }
</style>
