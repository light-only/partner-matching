<template>
  <van-card
      v-for="(item,index) in teamList"
      :desc="item.description"
      :title="item.name"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  >
    <template #tags>
      <van-tag plain type="primary">{{item.status===0?"公开":item.status===1?'私密':'加密'}}</van-tag>
    </template>
    <template #bottom>
      <div>
        {{'最大人数' +" : " + item.maxNum}}
      </div>
      <div>
        {{'过期时间' + " : "+moment(item.expireTime).format("YYYY-MM-DD")}}
      </div>
      <div>
        {{'创建时间' +" : " +moment(item.createTime).format("YYYY-MM-DD")}}
      </div>
    </template>
    <template #footer>
      <van-button size="mini" type="primary" @click="toAddPage">加入队伍</van-button>
    </template>
  </van-card>
</template>

<script setup>

import moment from "moment";


const props = defineProps({
  teamList:{
    type:Array,
    default:[]
  }
})
</script>

<style>

</style>
