<script setup>
    import {readingArrData, saveArrData} from "@/utils/utils.js";
    import {close,closeHover} from '@/assets/resources.ts'

    import {onMounted, reactive, ref, watch} from "vue";

    import { localStorageTopicAll,localStorageCurrentOptions } from '@/utils/config.ts'
    import PromptFrame from "@/components/PromptFrame.vue";
    import Button from "@/components/Button.vue";
    import {switchPage} from "@/utils/public.js";
    import router from "@/router/index.js";

    const allTopic = ref()
    const timer = ref()

    const promptMessage = reactive({
      type:'',
      message:''
    })

    const toggleImgCLose = ref(close)

    const chooseTopic = ref('')



  watch(promptMessage,(newValue,oldValue)=>{
    // console.log(newValue,oldValue)
    if (timer){
      clearTimeout(timer.value)
    }

    timer.value = setTimeout(()=>{
      promptMessage.type = ''
    },3000)
  })

  onMounted(()=>{
    const topicAll = readingArrData(localStorageTopicAll)
    if (!topicAll){
      setTimeout(()=>{
        promptMessage.type = "warning"
        promptMessage.message = '当前没有数据使用，去添加吧！'
      },300)
    }

    const chooseJson = readingArrData(localStorageCurrentOptions)
    if (!chooseJson) return

    allTopic.value = topicAll
    chooseTopic.value = chooseJson.fileName
  })

  const emit = defineEmits(['close-message','choose-message'])
  function Message(eventName,value){
    emit(eventName,value)
  }



  function saveChoose(){
      console.log(chooseTopic.value)
      console.log(allTopic.value)

    let chooseFile
    try {
       chooseFile = allTopic.value.filter((topic) => {
        return topic.fileName === chooseTopic.value
      })
    }catch (e){
      console.log(e)
      promptMessage.type = 'error'
      promptMessage.message = '当前没有选择的到题目文档，请添加后选择！'

      return
    }

      saveArrData(localStorageCurrentOptions,chooseFile[0])


      Message('close-message',false)
  }


</script>
<template>
    <div class="mask">
      <div class="container-content">
            <legend class="title"><slot name="option-title">选择答题库</slot> </legend>

            <label class="option" v-for="topic in allTopic" :for="topic.fileName">{{ topic.fileName }}
              <input type="radio" name="status" class="radio" :id="topic.fileName" :value="topic.fileName" v-model="chooseTopic"/>
            </label>

            <div class="img-close btn pos" @click="Message('close-message',false)">
              <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
            </div>

        <Button class="btn-pos" @click="saveChoose">选项此题库</Button>
      </div>



        <div class="prompt" v-if="promptMessage.type">
            <PromptFrame :messageType="promptMessage.type">
                <template v-slot:[promptMessage.type]>{{ promptMessage.message }}</template>
            </PromptFrame>
        </div>
    </div>




</template>

<style scoped>
  @import "@/assets/modal.css";


.container-content {
  width: 350px;
  padding: 20px 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.09);
  transform: translate(-50%,-50%);
  top:50%;
  left:50%;
  height: 70%;
  overflow-y: scroll;
    position: relative;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  user-select: none;
}

.option {
  font-weight: 500;
  height: 50px;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  border-radius: 8px;
  user-select: none;
}

.option:hover {
  background-color: #f4f4f4;
}

.option:has(.radio:checked) {
  color: #3b82f6;
  background-color: #eff6ff;
  box-shadow: 0 0 0 1px #dbeafe;
}

.icon {
  width: 20px;
  fill: currentColor;
}

.radio {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  accent-color: currentColor;
}

.modal{
  height: 70%;
  overflow-y: scroll;
  width: 100%;
  position: relative;
}
.pos{
    right: 10px;
    top:10px;
    position: absolute;
}
.btn-pos{
  position: absolute;
  transform: translate(-50%,-50%);
  bottom: 0;
  left: 50%;
}
.btn-pos:active{
  transform: translate(-50%,-50%) scale(1.1);
}
</style>