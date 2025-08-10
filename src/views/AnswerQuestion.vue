<script setup>
  import { readingArrData } from '@/utils/utils.js';
  import {localStorageCurrentOptions} from "@/utils/config.js";
  import {ref} from "vue";
  import {upTopic,upTopicHover,downTopic,downTopicHover} from '@/assets/resources.js'
  import TimerSet from "@/components/TimerSet.vue";

  const imgUpTopic = ref(upTopic)
  const imgDownTopic = ref(downTopic)

  const currentJson = readingArrData(localStorageCurrentOptions)
  const fileName = currentJson.fileName
  const jsonData = currentJson[fileName]
  const topicLength = jsonData.length

  const currentIndex = ref(0)

  function nextTopic(index){
    if (index >= topicLength - 1){
      return index
    }
    return ++index
  }

  function previousTopic(index){
    if (index <= 0){
      return index
    }
    return --index
  }

</script>

<template>
  <div class="content">
    <div class="container-content" :style="{transform:`translate(-${currentIndex}00%,0)`}">
      <div class="item-block" v-for="(item,index) in jsonData" :style="{transform:`translate(${index}00%,0)`}">
        <div v-if="!(index % 10)" :id="index"></div>
        <div class="title">
          {{ item.title }}
        </div>
        <div class="options">
          <p v-for="option in item.options">
            {{ option }}
          </p>
        </div>
      </div>

    </div>

    <div class="btn-toggle flex">
      <div class="up-topic btn"
           @mouseenter="imgUpTopic = upTopicHover"
           @mouseleave="imgUpTopic = upTopic"
           @click="currentIndex = previousTopic(currentIndex)"><img :src="imgUpTopic" alt=""></div>
      <div class="down-topic btn"
           @mouseenter="imgDownTopic = downTopicHover"
           @mouseleave="imgDownTopic = downTopic"
           @click="currentIndex = nextTopic(currentIndex)"><img :src="imgDownTopic" alt=""></div>
    </div>

  </div>
</template>

<style scoped>
  @import "@/assets/public.css";

  .content{
    width: 100%;
    height: 100vh;
    overflow:hidden;
    position: relative;
  }

  .content .container-content{
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .container-content .item-block{
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .container-content .item-block .title{
    font-size: 25px;
    padding: 10px 20px;
    font-weight: bold;
  }

  .container-content .item-block .options p{
    font-size: 22px;
    padding-left:30px ;
    line-height: 60px;
    cursor: pointer;
  }

  .container-content .item-block .options p:hover{
    background: #d1d1d1;
  }

  .content .btn-toggle{
    position: fixed;
    bottom: 100px;
    right: 100px;
    gap: 20px;
  }

  .content .btn-toggle .btn{
    width: 65px;
    height: 65px;
    cursor: pointer;
    background: #555;
    padding: 10px;
    border-radius: 50px;
    display:flex;
    justify-content: center;
    align-items: center;
    transition: .2s;

  }
  .content .btn-toggle .btn:hover{
    background: #999;
  }
  .content .btn-toggle .btn:active{
    background: #777;
  }

  .content .btn-toggle .btn img{
    width: 40px;
  }
</style>