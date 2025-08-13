<script setup>
  import {close, closeHover} from "@/assets/resources.js";
  import {ref} from "vue";
  const props = defineProps({
      topicNum:{
        type:Array,
        default:0
      }
    })

  const toggleImgCLose = ref(close)

  const emit = defineEmits(['close-message','choose-message'])
  function Message(eventName,value){
    emit(eventName,value)
  }

  console.log(props.topicNum)

</script>

<template>
  <div class="mask">
    <div class="container-modal">

      <div class="modal">
        <div class="img-close btn pos" @click="Message('close-message',false)">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
        <p class="content-title"><slot name="title">答题卡</slot></p>
        <div class="choose-content">
          <div class="box">
            <div class="choose" v-if="props.topicNum.length <= 100"
                 :style="{ background: item !== undefined ? '#FB2C36' : '#fff',boxShadow: item !== undefined ? '0 0 8px 0 #FB2C36': '#fff' }"
                 v-for="(item,index) in props.topicNum"
                 @click="Message('choose-message',index)">{{ item === null ? 'null' : index.toString().padStart(2,'0')}}</div>

              <div class="choose" v-else
                   v-for="(item,index) in props.topicNum"
                   @click="Message('choose-message',index)">{{ item === null ? 'null' : index.toString().padStart(3,'0')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";
  @import "@/assets/modal.css";
  .choose-content{
   height: 85%;
    overflow-y: auto;
  }
  .box{
    display: grid;
    grid-template-columns: repeat(10,1fr);
    margin-top: 15px;
    justify-items: center;
  }

  .choose{
    text-align: center;
    width: 65px;
    height: 65px;
    border:3px solid #000;
    border-radius: 50%;
    line-height: 60px;
    margin: 20px 0 ;
    cursor: pointer;
    font-size: 20px;
  }

  .choose:hover{
    background: #e6e6e6 !important;
  }

  .pos{
    position: absolute;
    right: 40px;
    top: 20px;
  }
</style>