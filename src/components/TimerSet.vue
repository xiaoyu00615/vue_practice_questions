<script setup>

  import {ref, onUnmounted, onMounted} from "vue";

  const timerSum = ref(0);
  let timer = null; // 存储定时器ID，初始为null（未启动）

  // 启动定时器
  function startTimer() {
    // 防止重复启动（如果已有定时器运行，则先清除）
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      timerSum.value++;
      console.log(timerSum.value);
    }, 1000);
  }

  // 停止定时器
  function stopTimer() {
    if (timer) { // 只有定时器存在时才清除
      clearInterval(timer);
      timer = null; // 重置状态，标记为已停止
    }
  }

  onMounted(()=>{
    startTimer()
  })

  // 组件卸载时自动停止，防止内存泄漏
  onUnmounted(stopTimer);


</script>

<template>
  <div class="content">
    <button @click="stopTimer">结束{{ timerSum }}</button>
  </div>
</template>

<style scoped>

</style>