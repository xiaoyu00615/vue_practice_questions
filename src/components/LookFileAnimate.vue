<script setup>
  import ButtonSave from "@/components/ButtonSave.vue";
  import {reactive, ref, watch} from "vue";
  import {close,closeHover} from '@/assets/resources.ts'
  import PromptFrame from "@/components/PromptFrame.vue";
  import {saveArrData,readingArrData} from "@/utils/utils.js";
  import {localStorageTopicAll , localStorageCurrentOptions} from '@/utils/config.ts'


  const props = defineProps({
    jsonMessages: {
      default:'success'
    },
    fileName:{
      default:'默认名称题目'
    },
    hasSubmit:{
      default:'true'
    }
  })

  const toggleImgCLose = ref(close)

  const emit = defineEmits(['close-message'])

  function closeMessage(eventName){
    emit(eventName,false)
  }

  const promptMessage = reactive({
    type:'',
    message:''
  })

  const timer = ref(null)

  watch(promptMessage,(newValue,oldValue)=>{
    // console.log(newValue,oldValue)
    if (timer){
      clearTimeout(timer.value)
    }

    timer.value = setTimeout(()=>{
      promptMessage.type = ''
    },3000)
  })


  function saveClose(){
    let saveList = []
    const topicAllData = readingArrData(localStorageTopicAll)
    if (topicAllData) saveList = topicAllData

    console.log(saveList)
    saveList.push(props.jsonMessages)

    const hasSuccess = saveArrData(localStorageTopicAll,saveList)
    const hasSuccessNow = saveArrData(localStorageCurrentOptions,props.jsonMessages)

    if (!hasSuccess || !hasSuccessNow){
      promptMessage.type = 'error'
      promptMessage.message = '保存失败，数据不合法！'
      return
    }

    promptMessage.type = 'success'
    promptMessage.message = '数据已保存完成，正在返回！'

    setTimeout(()=>{
      closeMessage('close-message')
    },800)

  }

</script>

<template>
  <div class="mask">
    <div class="container-modal">
      <div class="modal">

        <p class="content-title"><slot name="title">处理模型</slot></p>
        <p class="introduce">
          <slot>
            进入次模型后，可查看每道题的渲染结果，后续答题会参考这个<span class="prompt-important prompt-pad">模型进行渲染</span>答题。<br>
            规：一个<span class="prompt-important prompt-pad">虚线</span>代表一道题的页面，仔细查看渲染格式，如<span class="prompt-warning prompt-pad">有误及时修改源文件</span> <br>
            注：进入此界面直接退出<span class="prompt-important prompt-pad">不会保存这次数据</span>，请查看题目至<span class="prompt-important prompt-pad">最后一题</span>查看无误，<span class="prompt-important prompt-pad">点击</span>提交按钮进行保存数据
          </slot></p>

        <div class="topics">
          <div class="item-topic" v-for="item in jsonMessages[fileName]">
            <p v-if="item.answer" class="title">{{ item.title }}  -->  答案：{{ item.answer }}</p>
            <p v-else class="title">{{ item.title }}</p>
            <div class="options">
              <p class="item-option" v-for="option in item.options">{{ option }}</p>
            </div>
          </div>
        </div>


        <ButtonSave class="mar" v-if="hasSubmit" @click="saveClose">保存当前模型</ButtonSave>

        <div class="img-close btn pos" @click="closeMessage('close-message')">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
      </div>
    </div>



  </div>

  <div class="prompt" v-if="promptMessage.type">
    <PromptFrame :messageType="promptMessage.type">
      <template v-slot:[promptMessage.type]>{{ promptMessage.message }}</template>
    </PromptFrame>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";
  .mask{
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.3);
    position:fixed;
    top:0;
    z-index: 999;
  }

  .mask .container-modal{
    width: 70%;
    height: 80%;
    transform: translate(-50%,-50%);
    top:50%;
    left: 50%;
    position: absolute;

  }

  .mask .container-modal .modal{
    height: 100%;
    width: 100%;
    padding: 25px;
    overflow-y: auto;
    background: #fff;
    border-radius: 20px;
  }


  .mask .modal .content-title{
    font-size: 24px;
    text-align: center;
  }

  .mask .modal .topics .item-topic{
    padding: 8px 0;
    border-bottom: 2px dashed #000;
  }

  .mask .modal .topics .item-topic .options{
    margin-top: 5px;
  }

  .mask .modal .topics .item-topic .options .item-option{
    text-indent: 2em;
  }

  .mask .modal .introduce{
    text-indent: 2em;
    padding: 10px 20px;
    line-height: 35px;
  }


  .mask .modal .mar{
    margin: 40px auto 20px;
  }

  .container-modal .pos{
    position: absolute;
    top:20px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .3s;
  }
  .container-modal .pos:hover{
    border:2px dashed #000;
    transform:scale(1.2);
  }
</style>