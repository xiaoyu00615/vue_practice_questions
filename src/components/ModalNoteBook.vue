<script setup>

  import {close, closeHover} from "@/assets/resources";
  import {ref} from "vue";
  import ButtonSave from "@/components/ButtonSave.vue";
  import {readingArrData, saveArrData} from "@/utils/utils.js";
  import {localStorageCurrentOptions, localStorageTopicAll} from "@/utils/config.js";

  const props = defineProps({
    topicIndex : {
      type:Number,
      default:0
    },
    currentFileName:{
      type:String,
      default:''
    }
  })

  const toggleImgCLose = ref(close)

  const writeTitle = ref('')
  const writeOptions = ref('')
  const writeSummarize = ref('')
  const writeAuthor = ref('')

  init()

  function init(){
    getWriteContent()
  }

  function getWriteContent(){
    const getCurrent = readingArrData(localStorageCurrentOptions)
    const dataItem = getCurrent.explain.explainWrite[props.topicIndex]

    try {
      writeTitle.value = dataItem.title
      writeOptions.value = dataItem.options
      writeSummarize.value = dataItem.summarize
      writeAuthor.value = dataItem.author
    }catch (e){
      console.log(e)
    }
  }



  const emit = defineEmits(['close-message','prompt-message'])
  function Message(event,value){
    emit(event,value)
  }

  console.log(props.topicIndex)

  function saveNoteData(index){
    let currentJson = readingArrData(localStorageCurrentOptions)
    let currentAllJson = readingArrData(localStorageTopicAll)

    currentJson.explain.explainWrite[index] = {
      title:writeTitle.value,
      options:writeOptions.value,
      summarize:writeSummarize.value,
      author:writeAuthor.value
    }


    saveArrData(localStorageCurrentOptions,currentJson)

    const filterData =  currentAllJson.filter((json)=>{
      return !json[props.currentFileName]
    })
    filterData.unshift(currentJson)

    saveArrData(localStorageTopicAll,filterData)

    Message('close-message',false)

    Message('prompt-message',{
      type:'success',
      message:'写入笔记保存成功！'
    })
  }


</script>

<template>
  <div class="mask">
    <div class="container-modal">

      <div class="modal">
        <div class="img-close btn pos" @click="Message('close-message',false)">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
        <p class="content-title"><slot name="title">题目{{ topicIndex }}、笔记本</slot></p>
        <div class="write-content">
          <div class="write-title write-box">
            <textarea class="title write-public" placeholder="输入题目的标题解释" v-model="writeTitle"></textarea>
          </div>
          <div class="write-options write-box">
            <textarea class="options write-public" placeholder="输入题目额选项解释" v-model="writeOptions"></textarea>
          </div>
          <div class="write-summarize write-box">
            <textarea class="summarize write-public" placeholder="输入题目的总结解释" v-model="writeSummarize"></textarea>
          </div>
          <div class="write-author write-box">
            <textarea class="author write-public" placeholder="输入介绍题目的作者" v-model="writeAuthor"></textarea>
          </div>
        </div>
        <div class="flex-center">
          <ButtonSave @click="saveNoteData(topicIndex)">保存此题笔记</ButtonSave>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";
  @import "@/assets/modal.css";

  .pos{
    position: absolute;
    right: 40px;
    top: 20px;
  }

  .write-content{
    height: 75%;
    margin-top: 25px;
  }


  .write-content .write-box .write-public{
    border: 2px solid #2cca91;
    text-indent: 2em;
  }

  .write-content .write-box textarea{
    width: 100%;
    height: 100%;
  }

  .write-content .write-title{
    height: 20%;
  }
  .write-content .write-options{
    height: 40%;
  }
  .write-content .write-summarize{
    height: 30%;
  }
  .write-content .write-author{
    height: 10%;
  }

</style>