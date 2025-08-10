<script setup>
  import { readingArrData } from '@/utils/utils.js';
  import {localStorageCurrentOptions} from '@/utils/config.js'
  import ButtonBack from "@/components/ButtonBack.vue";
  import {switchPage} from "@/utils/public.js";
  import {useRouter} from "vue-router";

  const currentJson = readingArrData(localStorageCurrentOptions)

  const router = useRouter()
  const fileName = currentJson.fileName
  const jsonData = currentJson[fileName]


  console.log(jsonData)

</script>

<template>
  <div class="container-content">
    <div class="href">
      <div class="href-content">
        <p class="href-title">跳转链接</p>
        <div v-for="(item,index) in jsonData" class="href-box">
          <a href="#0" v-if="index === 0">题号：标题</a>
          <a :href="'#'+ index" v-else-if="!(index % 10)">题号：{{ index }}</a>
        </div>
      </div>
    </div>

    <div class="content">
      <ButtonBack id="back-size" @click="switchPage(router,'')"></ButtonBack>
      <div class="item-block" v-for="(item,index) in jsonData">
        <div v-if="!(index % 10)" :id="index"></div>
        <div class="title">
          {{ item.title }}
        </div>
        <div class="options">
          <p v-for="option in item.options">
            {{ option }}
          </p>
        </div>
        <div class="answer" v-if="item.answer">
          答案：{{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  *,html{
    scroll-behavior:smooth;
  }

  #back-size{
    height:60px;
    width: 130px;
    position: absolute;
    right: 50px;
    top: 30px;
  }

  .container-content{
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
  .container-content .href{
    width: 15%;
    height: 100%;
  }
  .container-content .href-content{
    padding: 0 10px;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
  .container-content .href-title{
    line-height: 40px;
    font-weight: bold;
    font-size: 18px;
  }

  .container-content .href-box a{
    padding: 8px 0 8px 20px;
    display: block;
    font-size: 18px;
    color: #551A8B;
    text-decoration: none;
    border-bottom: 4px solid #551A8B;
    border-left: 2px solid #551A8B;
    border-radius: 10px;
    margin:15px 0;
  }
  .container-content .href-box a:hover {
    background: #d2cfd4;
  }

  .container-content .content{
    padding: 0 5%;
    width: 85%;
    border-left: 4px dashed #000;
    height: 100%;
    overflow-y: scroll;
  }

  .container-content .content .item-block{
    padding: 15px 0;
    border-bottom: 4px dashed #8a8a8a;
    width: fit-content;
  }

  .container-content .content .item-block .title{
    line-height: 40px;
    font-weight: bold;
    font-size: 18px;
  }

  .container-content .content .item-block .options{
    line-height: 35px;
    padding-left: 20px;
  }

  .container-content .content .item-block .options p{
    border-bottom: 2px solid #000;
    width: fit-content;
  }

  .container-content .content .item-block .answer{
    font-size: 20px;
    background: #000;
    display: inline-block;
    transition: .5s;
    padding: 5px 12px;
    margin-top: 10px;
    border: 2px dashed #000;
    cursor: pointer;
    border-radius: 10px;
  }

  .container-content .content .item-block .answer:hover{
    background: #fff;
  }


</style>