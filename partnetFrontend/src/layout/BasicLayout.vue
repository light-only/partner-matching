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
    <template v-if="active === 'index'">
      <Index/>
    </template>
    <template v-if="active === 'team'">
      <Team/>
    </template>
  </div>

  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index">首页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
import {ref} from 'vue'
import Index from '../pages/Index.vue';
import Team from '../pages/Team.vue'
import {showToast} from "vant";
const onClickLeft = () => alert("左");
const onClickRight = () => alert('右');

const onChange=(index)=>showToast(`标签${index}`);
const active = ref('index');
</script>

<style scoped>
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #1989fa;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
}
</style>
