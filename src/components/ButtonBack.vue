<script setup lang="ts">
  import { imgBack,imgBackHover } from '@/assets/resources'
  import { ref } from 'vue'

  const toggleBackImg = ref(imgBack)

</script>

<template>
  <div class="--btn-back-size btn" @mouseenter="toggleBackImg = imgBackHover" @mouseleave="toggleBackImg = imgBack">
    <img :src="toggleBackImg" alt="" >
    <p class="content"><slot>返回</slot></p>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";

  .--btn-back-size{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    border: 3px solid #000;
    border-radius: 20px;
    background: rgba(0,0,0,.1);
  }

  .--btn-back-size img {
    width: 25px;
    height: 25px;
  }

  .--btn-back-size:hover{
    border:3px solid #ccc;
    background: #999;
    color: #fff;
  }

  .btn p{
    font-size: 16px;
  }
</style>