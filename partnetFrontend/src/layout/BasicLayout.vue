<template>
  <van-nav-bar
      :title="title"
      right-text="按钮"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #left v-if="isShow">
      <van-icon name="arrow-left" size="18"/>
      <span style="color: #646cff">返回</span>
    </template>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
   <router-view/>
  </div>

  <van-tabbar v-model="active" v-if="isShow1">
    <van-tabbar-item icon="home-o" name="index" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import router from '../router/index'
import routes from '../config/routes'
const DEFAULT_TITLE = "伙伴匹配";
const title = ref(DEFAULT_TITLE);
const isShow = ref(true);
const isShow1 = ref(true);

const active = ref('index');
/**
 * 左侧返回按钮
 */
const onClickLeft = () => router.back();

// 监听当前路由变化，选中对应的标签栏
watch(
    () => router.currentRoute.value,
    (newValue: any) => {
      if(newValue.path === '/'){
        active.value = 'index';
        isShow1.value = true;
      }else if(newValue.path === '/team'){
        active.value = 'team';
        isShow1.value = true;
      }else if(newValue.path === '/user'){
        active.value = 'user';
        isShow1.value = true;
      }else {
        newValue.value = false;
        isShow1.value = false;
      }
    },
    { immediate: true }
)

/**
 * 右侧搜索按钮
 */
const onClickRight = () => router.push('/search');

router.beforeEach((to,from)=>{
  const toPath = to.path;
  if(toPath === '/'){
    isShow.value = false;
  }else {
    isShow.value = true;
  }
  const route = routes.find((item)=>{
    return toPath == item.path;
  });
  title.value = route?.title ?? DEFAULT_TITLE;
})
</script>

<style scoped>
  #content {
    padding-bottom: 50px;
  }
</style>
