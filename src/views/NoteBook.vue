<script setup>


  import {readingArrData} from "@/utils/utils.js";
  import {localStorageCurrentOptions} from "@/utils/config.js";
  import {ref} from "vue";

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
    const attribute = clickDemo.dataset.note

    console.log(noteTypeList)
    if (noteTypeList[pageIndex.value] === null) {
      noteType.value = 'explainWrite'
    }else{
      noteType.value = attribute
    }

    noteTypeList[pageIndex.value] = noteType.value

    console.log(noteType.value+"笔记")

  }
</script>

<template>
  <div class="container-com">
    <div class="content">
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
            <div v-if="noteType === 'explainWrite'">
              <div v-if="getTopicJson.explain[noteType][pageIndex]">
                <p>{{ getTopicJson.explain[noteType][pageIndex].title }}</p>
                <p>{{ getTopicJson.explain[noteType][pageIndex].options }}</p>
                <p>{{ getTopicJson.explain[noteType][pageIndex].summarize }}</p>
                <p>{{ getTopicJson.explain[noteType][pageIndex].author }}</p>
              </div>
              <div v-else>
                暂无电子笔记！
              </div>
            </div>
            <div v-if="noteType === 'explainAi'">
              {{ getTopicJson.explain[noteType][pageIndex] ? getTopicJson.explain[noteType][pageIndex] : '暂无 Ai 笔记！' }}
            </div>
            <div v-if="noteType === 'explainFile'">
              {{ getTopicJson.explain[noteType][pageIndex] ? getTopicJson.explain[noteType][pageIndex] : '暂无文件笔记！' }}
            </div>
            <div v-else>暂没有笔记信息！</div>
          </div>
        </div>
        <div class="tab-tool">

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
  }

  .page .note-content{
    padding: 20px 30px;
    height: 50%;
    border:2px solid #000
  }
  .page .note-content .btn-toggle{
    display: flex;
    align-items: center;
    gap: 50px;
  }
  .page .note-content .btn-toggle .btn{
    border:3px solid #000;
    padding: 15px 25px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    background: #ccc;
  }
  .page .note-content .show-note{
    margin:  20px 0 0 0 ;
    border:2px solid #000
  }

  .tab-tool{
    height: 10%;
    display: flex;
    justify-items: center;
    align-items: end;
    background: #999;
  }

  .choose{
    position: relative;
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
    background: #000;
    z-index: -1;
  }



</style>