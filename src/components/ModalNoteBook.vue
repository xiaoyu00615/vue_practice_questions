<script setup>

  import {close, closeHover} from "@/assets/resources";
  import {ref} from "vue";
  import ButtonSave from "@/components/ButtonSave.vue";

  const props = defineProps({
    topicIndex : {
      type:Number,
      default:0
    }
  })

  const toggleImgCLose = ref(close)

  const emit = defineEmits(['close-message'])
  function Message(event,value){
    emit(event,value)
  }

  console.log(props.topicIndex)



</script>

<template>
  <div class="mask">
    <div class="container-modal">

      <div class="modal">
        <div class="img-close btn pos" @click="Message('close-message',false)">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
        <p class="content-title"><slot name="title">题目{{ props.topicIndex }}、笔记本</slot></p>
        <div class="write-content">
          <div class="write-title write-box">
            <textarea class="title write-public" placeholder="输入题目的标题解释"></textarea>
          </div>
          <div class="write-options write-box">
            <textarea class="option write-public" placeholder="输入题目额选项解释"></textarea>
          </div>
          <div class="write-summarize write-box">
            <textarea class="summarize write-public" placeholder="输入题目的总结解释"></textarea>
          </div>
          <div class="write-author write-box">
            <textarea class="author write-public" placeholder="输入介绍题目的作者"></textarea>
          </div>
        </div>
        <div class="flex-center">
          <ButtonSave>保存此题笔记</ButtonSave>
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

  .write-content .write-box{
    //border: 2px dashed red;
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

  .flex-center{
    display: flex;
    justify-content: center;
    justify-items: center;
    margin-top: 25px;
  }

</style>