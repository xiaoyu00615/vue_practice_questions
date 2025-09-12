<script setup>
  import {close, closeHover} from "@/assets/resources.js";
  import {ref} from "vue";
  import {readingArrData} from "@/utils/utils.js";
  import {localStorageCurrentOptions} from "@/utils/config.js";

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
  let getWriteNote,getAiNote,getFileNote
  try{
    getWriteNote = readingArrData(localStorageCurrentOptions).explain.explainWrite[props.currentIndex]
    getAiNote = readingArrData(localStorageCurrentOptions).explain.explainAi[props.currentIndex]
    getFileNote = readingArrData(localStorageCurrentOptions).explain.explainFile[props.currentIndex]
  }catch (e){
    getWriteNote = null
    getAiNote = null
    getFileNote = null
  }


  console.log(getWriteNote)
</script>

<template>
  <div class="mask">
    <div class="container-modal">

      <div class="modal">
        <div class="img-close btn pos" @click="Message('close-message',false)">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
        <p class="content-title"><slot name="title">Ai 解释</slot></p>
        <div class="content">
          <div class="note-write item">
            <div class="title-style">电子笔记：</div>
            <div class="box" v-if="getWriteNote">
              <p>标题：{{ getWriteNote.title }}</p>
              <p>选项：{{ getWriteNote.options }}</p>
              <p>总结：{{ getWriteNote.summarize }}</p>
              <p>作者：{{ getWriteNote.author }}</p>
            </div>
            <p v-else>暂无笔记...</p>
          </div>
          <div class="ai-write item">
            <div class="title-style">AI 笔记:</div>
            <p v-if="getAiNote">{{ getAiNote }}</p>
            <p v-else>暂无笔记...</p>
          </div>
          <div class="file-write item">
            <div class="title-style">文件笔记：</div>
            <p v-if="getFileNote">{{ getFileNote }}</p>
            <p v-else>暂无笔记...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";
  @import "@/assets/modal.css";

  .content{
    height: 85%;
    margin-top: 25px;
    border:2px solid #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item{
    border:2px solid #00A63E;
    height: 100%;
    overflow-y: scroll;
    padding: 10px;
    text-indent: 2em;
  }

  .title-style{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>