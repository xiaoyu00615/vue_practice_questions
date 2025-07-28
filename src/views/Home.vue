<script setup lang="ts">
  import {reactive} from "vue";

  import AnswerQuestionsCard from "@/components/AnswerQuestionsCard.vue";
  const fileData = reactive(null)

</script>

<template>
  <div class="container">
    <div class="left">
      <div class="int-content">
        <p>添加数据文件：</p>
        <input class="int-file" type="file">
        <button>提交文件</button>
      </div>

      <div class="file-data">
        <h2>文件数据:</h2>
        <p v-if="fileData">暂时没有文件信息</p>
        <div v-else class="file-message">
          <p>文件名称：</p>
          <p>文件大小：</p>
          <p>文件格式：</p>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="column">

      </div>
      <div class="content">
        <AnswerQuestionsCard></AnswerQuestionsCard>
        <AnswerQuestionsCard front-color="#775ad6" back-color="#5ad6b5">
          <template #front-title>自定义答题</template>
          <template #front-content>依据自己设计的题进行答题，统计时间，判断答题情况等，</template>
          <template #back-title>注意事项</template>
          <template #back-content>进入后会开始计时，直接退出会失去答题进度（建议提交后退出！）</template>
        </AnswerQuestionsCard>
        <AnswerQuestionsCard front-color="#de315d" back-color="#de31b4">
          <template #front-title>错题本答题</template>
          <template #front-content>依据自己平时答题目错误的题进行答题，统计时间，判断答题情况等，</template>
        </AnswerQuestionsCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container{
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
  }
  .container .left{
    padding: 20px;
    width: 30%;
    border:2px solid #000;
    height: 100%;
  }
  .container .left .int-content p{
    margin: 10px 0 ;
    font-size: 20px;
  }
  .container .left .int-content .int-file{
    width: 300px;
    height: 45px;
    cursor: pointer;
  }
  .container .left .int-content button{
    width: 90px;
    height:40px;
    border-radius: 11px;
    cursor: pointer;
  }
  .container .left .int-content button:hover{
    background: #ccc;
  }
  .container .file-data h2{
    line-height: 45px;
  }
  .container .file-data .file-message{
    line-height: 35px;
  }


  .container .right{
    width: 70%;
    height: 100%;
    border:2px solid red;
    padding: 20px;
  }
  .container .column{
    height: 60px;
    margin-bottom: 20px;
  }

  .container .right .content{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 50px;
    justify-items: center;
  }
</style>