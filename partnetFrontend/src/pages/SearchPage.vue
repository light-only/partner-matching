<template>
    <form action="/">
      <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
      ></van-search>
    </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length===0" style="text-align: center">请选择标签!</div>
     <div style="display: grid;grid-template-columns: repeat(4, 1fr);">
       <van-tag style="margin: 10px 5px" v-for="(item,index) in activeIds" :show="true" closeable size="medium" type="primary" @close="close(index)">
         {{item}}
       </van-tag>
     </div>
  <van-divider content-position="right">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button type="primary" block @click="doSearchResult">搜索</van-button>
  </div>

</template>

<script setup>
  import { ref } from 'vue';
  import { showToast } from 'vant';
  import router from '../router/index'

  const activeIds = ref([]);
  const show = ref(true);
  const checked = ref(true);
  const searchValue = ref('');
  const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag=>{
      const tempChildren = [...parentTag.children];
      const tempParentTag = {...parentTag};
      tempParentTag.children = tempChildren.filter(item=>item.text.includes(searchValue.value));
      return tempParentTag;
    })
  }
  /**
   * 搜索按钮
   */
  const doSearchResult = ()=>{
    router.push({
      path:'/user/list',
      query:{
        tags:activeIds.value
      }
    })
  }
  const onCancel = () => {
    showToast('取消');
    tagList.value = originTagList;
  };
  const close= (index)=> {
    activeIds.value.splice(index,1);
  };

  const activeId = ref([1, 2]);
  const activeIndex = ref(0);
  const originTagList = [
    {
      text: '性别',
      children: [
        { text: '男', id: '男' },
        { text: '女', id: '女' },
        { text: '未知', id: '未知' },
      ],
    },
    {
      text: '年级',
      children: [
        { text: '大一', id: '大一' },
        { text: '大二', id: '大二' },
        { text: '大三', id: '大三' },
        { text: '大四', id: '大四' }
      ],
    }
  ];
  let tagList = ref(originTagList);


</script>

<style scoped>

</style>
