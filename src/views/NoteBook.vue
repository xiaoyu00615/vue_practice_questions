<script setup>
import {delDemoClass, delDemoClassDemo, readingArrData} from "@/utils/utils.js";
  import {localStorageCurrentOptions} from "@/utils/config.js";
  import {downTopic,upTopic} from '@/assets/resources.ts'
  import {ref} from "vue";
  import {switchPage} from "@/utils/public.js";
  import {useRouter} from "vue-router";

  const router = useRouter()
  const getTopicJson = readingArrData(localStorageCurrentOptions)
  console.log(getTopicJson)
  const getTopicFileName = getTopicJson.fileName
  const getCurrentTopicJson = getTopicJson[getTopicFileName]
  console.log(getCurrentTopicJson)

  const noteType = ref('explainWrite')

  const pageIndex = ref(0)
  const noteTypeList = new Array(getCurrentTopicJson.length).fill(null)


  function toggleNote(event){
    const clickDemo = event.target

    const demoPare = clickDemo.parentNode
    console.log(demoPare)

    delDemoClassDemo(demoPare,"choose")

    clickDemo.classList.add('choose')
    const attribute = clickDemo.dataset.note

    console.log(noteTypeList)
    if (noteTypeList[pageIndex.value] === null) {
      noteType.value = 'explainWrite'
    }else{
      noteType.value = attribute
    }

    noteTypeList[pageIndex.value] = noteType.value

    // console.log(noteType.value+"笔记")
  }

  const currentIndex = ref(0)
  function nextTopic(index){
    if (index >= getCurrentTopicJson.length - 1){
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
  <div class="container-com">
    <div class="content" :style="{transform:`translate(-${currentIndex}00%,0)`}">
      <div class="page" v-for="(topic,index) in getCurrentTopicJson" :style="{transform:`translate(${index}00%,0)`}">
        <div class="topic-content">
          <div class="title">{{ topic.title }}</div>
          <div class="options">
            <p v-for="option in topic.options">{{ option }}</p>
          </div>
        </div>
        <div class="note-content">
          <div class="btn-toggle">
            <div class="btn write-note choose" data-note="explainWrite" @click="toggleNote">电子笔记</div>
            <div class="btn ai-note" data-note="explainAi" @click="toggleNote">AI 笔记</div>
            <div class="btn file-note" data-note="explainFile" @click="toggleNote">文件笔记</div>
          </div>
          <div class="show-note">
            <div class="note-box" v-if="noteType === 'explainWrite'">
              <div v-if="getTopicJson.explain[noteType][currentIndex]">
                <p>{{ getTopicJson.explain[noteType][currentIndex].title }}</p>
                <p>{{ getTopicJson.explain[noteType][currentIndex].options }}</p>
                <p>{{ getTopicJson.explain[noteType][currentIndex].summarize }}</p>
                <p>{{ getTopicJson.explain[noteType][currentIndex].author }}</p>
              </div>
              <div v-else>
                暂无电子笔记！
              </div>
            </div>
            <div class="note-box" v-else-if="noteType === 'explainAi'">
              {{ getTopicJson.explain[noteType][currentIndex] ? getTopicJson.explain[noteType][currentIndex] : '暂无 Ai 笔记！' }}
            </div>
            <div class="note-box" v-else-if="noteType === 'explainFile'">
              {{ getTopicJson.explain[noteType][currentIndex] ? getTopicJson.explain[noteType][currentIndex] : '暂无文件笔记！' }}
            </div>
            <div class="note-box" v-else>暂没有笔记信息！</div>
          </div>
        </div>
        <div class="tab-tool">

          <div class="back" @click="switchPage(router,'')">
            返回首页
          </div>
          <div class="pos">
            <div class="next size" @click="currentIndex = previousTopic(currentIndex)">
              <img :src="upTopic" alt="">
            </div>
            <div class="up size" @click="currentIndex = nextTopic(currentIndex)">
              <img :src="downTopic" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container-com{
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .content{
    height: 100%;
    position: relative;
  }
  .page{
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .page .topic-content{
    height: 40%;
    padding: 20px;
  }

  .page .note-content{
    padding: 20px 30px;
    height: 50%;
    border-top:3px solid #777;
  }
  .page .note-content .btn-toggle{
    display: flex;
    align-items: center;
    gap: 50px;
  }
  .page .note-content .btn-toggle .btn{
    border:2px solid #ccc;
    padding: 15px 25px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    background: #fff;
  }
  .page .note-content .show-note{
    margin:  28px 0 0 0 ;
    height: 75%;
    border:1px solid #666;
    border-radius: 10px;
  }

  .tab-tool{
    height: 10%;
    display: flex;
    justify-items: center;
    border-top: 3px solid #555;
    background: #f7f7f7;
    align-items: center;
    justify-content: space-evenly;
  }

  .choose{
    position: relative;
    background: #ccc !important;
    border: 2px solid #000 !important;
  }

  .choose::before{
    height: 30px;
    width: 30px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%,50%) rotate(45deg);
    content: "";
    display: block;
    background: #333;
    z-index: -1;
  }

  .note-box{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 15px 18px;
    text-indent: 2em;
  }

  .size{
    width: 60px;
    height: 60px;

    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .size img{
    height: 25px;
    width: 40px;
  }
  .size:hover{
    background: #cccccc;
  }

  .pos{
    display: flex;
    gap: 30px;
  }
  .back{
    padding: 10px 15px;
    border:2px solid #ccc;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
  }
  .back:hover{
    background: #e3e3e3;
    border:2px solid #b0b0b0;
  }

  .options{
    text-indent: 1em;
    line-height: 35px;
  }
  .title{
    line-height: 40px;
  }

</style>