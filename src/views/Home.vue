<script setup>
  import {reactive,ref} from "vue";

  import {switchPage} from '@/public/public.js'
  import {countSize , splitFormat} from '@/public/utils'
  import {extractTextFromWord} from '@/public/wordHandler.js'
  import AnswerQuestionsCard from "@/components/AnswerQuestionsCard.vue";
  import PromptFrame from '@/components/PromptFrame.vue'
  import {useRouter} from "vue-router";

  const router = useRouter()
  const fileData = reactive({
    fileName:'',
    fileSize:'',
    fileFormat:''
  })

  const WordText = ref(null)

  function readerWord(e){
    const file = e.target.files[0]

    if (!file) return;
    // 保持响应式
    Object.assign(fileData,{
      fileName : file.name,
      fileSize : countSize(file.size),
      fileFormat :splitFormat(file.name)
    })

    if (!file.name.endsWith('.docx')) return
    console.log(file)


    Promise.all([
        extractTextFromWord(file)
    ]).then((text)=>{
      WordText.value = text
      console.log(text)
    }).catch((err)=>{
      console.log(err)
    })
  }

</script>

<template>
  <div class="container-con">
    <div class="left">
      <div class="int-content">
        <p>添加数据文件：</p>
        <input @change="readerWord" class="int-file" type="file">
        <button>提交文件</button>
      </div>

      <div class="file-data">
        <h2>文件数据:</h2>
        <p v-if="!fileData.fileName">暂时没有文件信息</p>
        <div v-else class="file-message">
          <p>文件名称：{{ fileData.fileName }}</p>
          <p>文件大小：{{ fileData.fileSize }}</p>
          <p>文件格式：{{ fileData.fileFormat }}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="column">
        <button @click="switchPage(router,'login')">
          <span>Login - 登录</span>
        </button>
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

  <div class="prompt">
<!--    <PromptFrame>-->
<!--&lt;!&ndash;      <template #mes_success>正确可以被识别</template>&ndash;&gt;-->
<!--    </PromptFrame>-->
  </div>




</template>

<style scoped>
  .container-con{
    height: 100vh;
    width: 100%;
    display: flex;
  }
  .container-con .left{
    padding: 20px;
    width: 30%;
    border:2px solid #000;
    height: 100%;
  }
  .container-con .left .int-content p{
    margin: 10px 0 ;
    font-size: 20px;
  }
  .container-con .left .int-content .int-file{
    width: 300px;
    height: 45px;
    cursor: pointer;
  }
  .container-con .left .int-content button{
    width: 90px;
    height:40px;
    border-radius: 11px;
    cursor: pointer;
  }
  .container-con .left .int-content button:hover{
    background: #ccc;
  }
  .container-con .file-data h2{
    line-height: 45px;
  }
  .container-con .file-data .file-message{
    line-height: 35px;
  }


  .container-con .right{
    width: 70%;
    height: 100%;
    border:2px solid red;
    padding: 20px;
  }
  .container-con .column{
    height: 60px;
    margin-bottom: 20px;
  }

  .container-con .right .content{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 50px;
    justify-items: center;
  }


  .column{
    position: relative;
  }
  /* 登录按钮 */
  .column button {
    background: transparent;
    position: absolute;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid rgb(36, 41, 46);
    border-radius: 20px;
    outline: none;
    overflow: hidden;
    color: rgb(36, 41, 46);
    transition: color 0.3s 0.1s ease-out;
    text-align: center;
    right: 30px;
  }

  .column button span {
    margin: 10px;
  }

  .column button::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: "";
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  .column button:hover {
    color: #fff;
    border: 2px solid rgb(36, 41, 46);
  }

  .column button:hover::before {
    box-shadow: inset 0 0 0 10em rgb(36, 41, 46);
  }


  /* 提示框 */
  .prompt{
    height: 92px;
    width: 400px;
    position:absolute;
    transform: translate(-50%,-50%);
    top:50%;
    left: 50%;
  }
</style>