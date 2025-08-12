<script setup>

  import {ref, onUnmounted, onMounted} from "vue";
  import { timerConvert } from "@/utils/utils.js";
  import {clock} from '@/assets/resources.ts';

  const timerSum = ref(0);
  const timer = ref(); // 存储定时器ID，初始为null（未启动）

  const strTimer = ref('00:00:00')



  // 启动定时器
  function startTimer() {
    // 防止重复启动（如果已有定时器运行，则先清除）
    if (timer.value) clearInterval(timer.value);

    timer.value = setInterval(() => {
      timerSum.value++;
      strTimer.value = timerConvert(timerSum.value)
    }, 1000);
  }

  // 停止定时器
  function stopTimer() {
    if (timer) { // 只有定时器存在时才清除
      clearInterval(timer);
      timer.value = null; // 重置状态，标记为已停止
    }
  }

  onMounted(()=>{
    startTimer()
  })

  // 组件卸载时自动停止，防止内存泄漏
  onUnmounted(stopTimer);


</script>

<template>
  <div class="content-timer">
    <img :src="clock" alt=""><div @click="stopTimer">{{ strTimer }}</div>
  </div>
</template>

<style scoped>
  .content-timer {
    width: fit-content;
    padding: 8px 15px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 15px;
    border:3px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    cursor: pointer;
  }

  .content-timer img {
    width: 30px;
  }

</style>