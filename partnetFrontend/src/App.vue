<template>
  <BasicLayout></BasicLayout>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import router from './router/index'
import BasicLayout from './layout/BasicLayout.vue'
import {watch} from "vue";
const isShow = ref(true);
</script>



<style scoped>
</style>
