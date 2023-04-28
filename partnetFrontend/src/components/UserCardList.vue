<template>
  <van-card
      v-for="(mockUser,index) in userList"
      :key="index"
      :desc="mockUser.profile"
      :title="mockUser.userName + mockUser.planetCode"
      :thumb="mockUser.avatarUrl || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in mockUser.tags" style="margin-right:8px;margin-top: 8px">{{tag}}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="linkMine">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length===0" description="数据为空" />
</template>

<script setup lang="ts">
  import {showToast} from "vant";
  import {defineProps} from "vue";

  const props = defineProps({
    userList:{
      type:Array,
      default:[]
    }
  })

  const linkMine = ()=>{
    showToast('联系我');
  }

</script>


<style scoped>

</style>
