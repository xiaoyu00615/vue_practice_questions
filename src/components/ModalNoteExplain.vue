<script setup>
  import {close, closeHover} from "@/assets/resources.js";
  import {ref} from "vue";

  const props = defineProps({
    currentIndex:{
      type:Number,
      default:1
    }
  })

  const toggleImgCLose = ref(close)

  const emit = defineEmits(['close-message'])
  function Message(event,value){
    emit(event,value)
  }

</script>

<template>
  <div class="mask">
    <div class="container-modal">

      <div class="modal">
        <div class="img-close btn pos" @click="Message('close-message',false)">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
        <p class="content-title"><slot name="title">Ai 解释</slot></p>

      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";
  @import "@/assets/modal.css";

</style>