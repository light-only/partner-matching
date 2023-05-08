<template>

</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const useScroll =(elRef)=>{
  let el = window;
  const isReachBottom = ref(false);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const scrollListenerHandle =() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    // console.log(clientHeight.value, scrollTop.value, scrollHeight.value);
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true;
    }
  }

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListenerHandle);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandle);
  });

  return { isReachBottom, scrollTop };
}
</script>
