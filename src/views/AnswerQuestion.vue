<script setup>
  import {compareAnswerFun, extractAnswer, mappingLetter, readingArrData} from '@/utils/utils.js';
  import {localStorageCurrentOptions} from "@/utils/config.js";
  import {reactive, ref, watch} from "vue";
  import {
    upTopic,
    upTopicHover,
    downTopic,
    downTopicHover,
    answerCardImg,
    answerCardHoverImg,
    backHome,
    backHomeHover,
    notebook,
    notebookHover
  } from '@/assets/resources.js'
  import TimerSet from "@/components/TimerSet.vue";
  import PromptFrame from "@/components/PromptFrame.vue";
  import ButtonAiAnswer from "@/components/ButtonAiAnswer.vue";
  import ModalAnswerCard from "@/components/ModalAnswerCard.vue";
  import {switchPage} from "@/utils/public.js";
  import {useRouter} from "vue-router";
  import ModalNoteBook from "@/components/ModalNoteBook.vue";
  import ModalAiExplain from "@/components/ModalAiExplain.vue";
  import ModalNoteExplain from "@/components/ModalNoteExplain.vue";

  const router = useRouter()
  const imgUpTopic = ref(upTopic)
  const imgDownTopic = ref(downTopic)
  const imgAnswerCard = ref(answerCardImg)
  const imgBackHome = ref(backHome)
  const imgNoteBook = ref(notebook)

  const timer = ref()
  const timerNext = ref()
  const promptMessage = reactive({
    type:'',
    message:''
  })

  const hasShowAnswerCard = ref(false)
  const hasShowNoteBook = ref(false)
  const hasAIExplain = ref(false)
  const hasNoteExplain = ref(false)


  const currentJson = readingArrData(localStorageCurrentOptions)
  const currentFileName = currentJson.fileName
  const jsonData = currentJson[currentFileName]
  const topicLength = jsonData.length
  let answerJson = []

  const trueTopicNum = ref(0)
  const falseTopicNum = ref(0)

  const currentIndex = ref(0)

  let answerCard = new Array(topicLength).fill(undefined)

  init()

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

  function clickChoose(event){
    const standardAnswer = answerJson[currentIndex.value]
    // 判断这道题是否有答案
    if (standardAnswer === null){
      promptMessage.type = 'warning'
      promptMessage.message = '此题不可提交，点击下一题开始答题！'
      return
    }

    // 判断选择过了吗
    if (answerCard[currentIndex.value] !== undefined) return;



    const clickDemo = event.target
    const parentDemo = [...clickDemo.parentNode.children]
    // 单击选择的答案
    const topicAnswer = mappingLetter(clickDemo.dataset.index)
    // 保存答题卡选项
    answerCard[currentIndex.value] = topicAnswer

    // console.log("点击题目的答案："+topicAnswer,"标准答案："+standardAnswer)
    const compareAnswer = compareAnswerFun(topicAnswer,standardAnswer)

    // 渲染逻辑
    if (compareAnswer){
      delayedNext(800)

      promptMessage.type = 'success'
      promptMessage.message = '(^∇^*) 答对啦！'+  "正确：" + standardAnswer

      clickDemo.classList.add('topic-success')
    }else{
      delayedNext(1200)

      promptMessage.type = 'error'
      promptMessage.message = 'ヾ(≧へ≦)〃 答错啦！' + "正确：" + standardAnswer
      parentDemo.forEach((demo)=>{
        let choose = compareAnswerFun(mappingLetter(demo.dataset.index),standardAnswer)

        if (!choose){
          demo.classList.add('topic-warning')
        }else{
          demo.classList.add('topic-success')
        }
      })
      clickDemo.classList.remove('topic-warning')
      clickDemo.classList.add('topic-error')
    }
    console.log(answerCard)

  }

  // 保存不能作答的选项
  function saveChoose(){
    answerJson.forEach((answer,index)=>{
      if (answer === null){
        answerCard[index] = null
      }
    })
  }

  function init(){
    answerJson = extractAnswer(jsonData,'answer')
    console.log(answerJson)
    saveChoose()
  }

  function delayedNext(timerNum){
    if (timerNext.value) clearTimeout(timerNext.value)

    timerNext.value = setTimeout(()=>{
      nextTopic(currentIndex.value++)
    },timerNum)

  }


  watch(promptMessage,(newValue,oldValue)=>{
    // console.log(newValue,oldValue)
    if (timer.value){
      clearTimeout(timer.value)
    }

    timer.value = setTimeout(()=>{
      promptMessage.type = ''
    },2000)
  })

  function closeMessage(value){
    hasShowAnswerCard.value = value
    hasShowNoteBook.value = value
    hasAIExplain.value = value
    hasNoteExplain.value = value
  }

  function chooseMessage(value){
    hasShowAnswerCard.value = false
    currentIndex.value = value

  }

  function promptMessageEmit(value){
    promptMessage.type = value.type
    promptMessage.message = value.message
  }

</script>

<template>
  <div class="content">
    <div class="container-content" :style="{transform:`translate(-${currentIndex}00%,0)`}">
      <div class="item-block" v-for="(item,index) in jsonData" :style="{transform:`translate(${index}00%,0)`}">
        <div class="title">
          <div class="note scale-primary-1" @click="hasNoteExplain = true"></div>
          {{ item.title }}
        </div>
        <div class="options">
          <p v-for="(option,index) in item.options" @click="clickChoose" :data-index="index">
            {{ option }}
          </p>
        </div>
        <div class="answer-prompt" v-show="answerCard[currentIndex] !== null && answerCard[currentIndex] !== undefined">
          <p class="false-answer">选择的答案：{{ answerCard[currentIndex] }}</p>
          <p class="true-answer">正确的答案：{{ answerJson[currentIndex] }}</p>
        </div>
      </div>

    </div>
    <div class="toolbar">
      <!-- 返回首页 -->
      <div class="back-home cur-p scale-primary-1" @click="switchPage(router,'')"
           @mouseenter="imgBackHome = backHomeHover"
           @mouseleave="imgBackHome = backHome">
        <img :src="imgBackHome" alt="">
      </div>

      <!-- 记录笔记 -->
      <div class="back-notebook cur-p scale-primary-1"
           @click="hasShowNoteBook = true"
           @mouseenter="imgNoteBook = notebookHover"
           @mouseleave="imgNoteBook = notebook">
        <img :src="imgNoteBook" alt="">
      </div>

      <!-- 答题卡 -->
      <div class="answer-card cur-p scale-primary-1" @click="hasShowAnswerCard = true"
           @mouseenter="imgAnswerCard = answerCardHoverImg"
           @mouseleave="imgAnswerCard = answerCardImg">
        <img :src="imgAnswerCard" alt="">
      </div>

      <!-- AI 解题 -->
      <ButtonAiAnswer @click="hasAIExplain = true" class="scale-primary-1"></ButtonAiAnswer>

      <!-- 切换题目按钮 -->
      <div class="btn-toggle flex">
        <div class="up-topic btn scale-primary-1"
             @mouseenter="imgUpTopic = upTopicHover"
             @mouseleave="imgUpTopic = upTopic"
             @click="currentIndex = previousTopic(currentIndex)"><img :src="imgUpTopic" alt=""></div>
        <div class="down-topic btn scale-primary-1"
             @mouseenter="imgDownTopic = downTopicHover"
             @mouseleave="imgDownTopic = downTopic"
             @click="currentIndex = nextTopic(currentIndex)"><img :src="imgDownTopic" alt=""></div>
      </div>
    </div>


    <!-- 设置时间 -->
    <TimerSet class="pos-timer"></TimerSet>

    <div class="prompt" v-if="promptMessage.type">
      <PromptFrame :messageType="promptMessage.type">
        <template v-slot:[promptMessage.type]>{{ promptMessage.message }}</template>
      </PromptFrame>
    </div>

    <!-- 模态答案卡片 -->
    <ModalAnswerCard
        v-if="hasShowAnswerCard"
        :topicNum="answerCard"
        @close-message="closeMessage"
        @choose-message="chooseMessage"></ModalAnswerCard>

    <!-- 模态笔记本 -->
    <ModalNoteBook
        :topicIndex = currentIndex
        :currentFileName = currentFileName
        v-if="hasShowNoteBook"
        @prompt-message="promptMessageEmit"
        @close-message="closeMessage"></ModalNoteBook>

    <!-- 模态 Ai 解释 -->
    <ModalAiExplain
        @close-message="closeMessage"
        @prompt-message="promptMessageEmit"
        :currentIndex="currentIndex"
        :jsonData="jsonData"
        :currentFileName = currentFileName
        v-if="hasAIExplain"></ModalAiExplain>

    <!-- 模态笔记显示 -->
    <ModalNoteExplain
        @close-message="closeMessage"
        :currentIndex="currentIndex"
        v-if="hasNoteExplain">
      <template #title>题目{{ currentIndex }}、查看笔记</template>
    </ModalNoteExplain>


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
    padding: 10px 20px 5px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 10px;
  }



  .container-content .item-block .options p{
    font-size: 22px;
    padding-left:50px ;
    line-height: 60px;
    cursor: pointer;
  }

  .container-content .item-block .options p:hover{
    background: #d1d1d1;
  }

  .content .btn-toggle{

    gap: 20px;
  }
  .toolbar{
    position: fixed;
    bottom: 0;
    height: 100px;
    background: #e8e8e8;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10%;
    border-top: 3px solid #333;
    box-shadow: 0 -2px 5px 0 rgba(0,0,0,.2);
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

  .pos-timer{
    position: absolute;
    right: 0;
  }

  .answer-prompt{
    padding: 10px 50px;
    font-size: 20px;
    line-height: 40px;
  }

  .note{
    border-radius: 10px;
    overflow: hidden;
    border:20px solid transparent;
    border-top-color: #888;
    margin-top: 18px;
    cursor: pointer;
  }

  .note:hover{
    border-top-color: #000;
  }

</style>