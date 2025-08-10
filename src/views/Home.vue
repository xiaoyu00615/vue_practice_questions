<script setup>
  import {onMounted, reactive, ref, watch} from "vue";

  import {switchPage} from '@/utils/public.js'
  import {countSize, handleTopic, readingArrData, splitFormat} from '@/utils/utils'
  import {extractTextFromWord} from '@/utils/wordHandler.js'
  import AnswerQuestionsCard from "@/components/AnswerQuestionsCard.vue";
  import PromptFrame from '@/components/PromptFrame.vue'
  import {useRouter} from "vue-router";
  import Button from "@/components/Button.vue";
  import LookFileAnimate from "@/components/LookFileAnimate.vue";
  import ButtonCode from "@/components/ButtonCode.vue";
  import ComOptionModal from "@/components/ComOptionModal.vue";
  import ButtonOption from "@/components/ButtonOption.vue";

  const router = useRouter()
  const fileData = reactive({
    fileName:'',
    fileSize:'',
    fileFormat:''
  })

  const WordText = ref(null)
  const timer = ref(null)
  const lookFile = ref(null)
  const hasChoosetopic = ref(false)

  const jsonMessage = ref(null)
  const LookFileCom = ref(null)

  const promptMessage = reactive({
    type:'',
    message:''
  })

  const fileMessage = ref('点击选择文件（.docx）')

  const loginMessage = ref('Login - 登录')

  function readerWord(e){
    const file = e.target.files[0]

    if (!file) return;

    // 保持响应式
    Object.assign(fileData,{
      fileName : file.name,
      fileSize : countSize(file.size),
      fileFormat :splitFormat(file.name)
    })

    // 文件名称显示
    fileMessage.value = fileData.fileName

    if (!file.name.endsWith('.docx')){
      promptMessage.type = 'error'
      promptMessage.message = '文件选择不正确'
      return;
    }

    promptMessage.type = 'success'
    promptMessage.message = '文件通过检查'


    Promise.all([
        extractTextFromWord(file)
    ]).then((text)=>{
      WordText.value = text
      // console.log(text)
    }).catch((err)=>{
      console.log(err)
    })
  }

  function startFile(){
    const jsonTopic = handleTopic(WordText.value[0],fileData.fileName)

    if (!jsonTopic){
      promptMessage.type = 'error'
      promptMessage.message = '文件处理失败'
    }else{
      promptMessage.type = 'success'
      promptMessage.message = '文件处理成功，点击查看模型显示处理效果！'
    }

    lookFile.value = true

    jsonMessage.value = jsonTopic
    // console.log('格式化题目',jsonTopic)
  }

  function lookModel(){
    LookFileCom.value = 'true'
  }

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

    const localMes = readingArrData('loginUser')
    if (!localMes) return

    loginMessage.value = `你好： ${localMes.userName}`

    promptMessage.type = 'success'
    promptMessage.message = `登录成功，你好 ${ localMes.userName }`
  })

  function closeMessage(value){
    LookFileCom.value = value
    hasChoosetopic.value = value
  }

</script>

<template>
  <div class="container-con">
    <div class="left">
      <div class="int-content">
        <label class="custum-file-upload" for="file">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
          </div>
          <div class="text">
            <span>{{ fileMessage }}</span>
          </div>
          <input type="file" @change="readerWord" class="int-file" id="file">
        </label>
      </div>
      <Button class="btn" @click="startFile">处理文件</Button>
      <div class="file-data">
        <p v-if="!fileData.fileName">暂时没有文件信息</p>
        <div v-else class="file-message">
          <p>文件名称：{{ fileData.fileName }}</p>
          <p>文件大小：{{ fileData.fileSize }}</p>
          <p>文件格式：{{ fileData.fileFormat }}</p>
        </div>
      </div>

      <Button v-show="lookFile" class="mar" @click="lookModel">查看处理模型</Button>
    </div>
    <div class="right">
      <div class="column">
        <ButtonCode class="chat" @click="switchPage(router,'chat')">AI 聊天</ButtonCode>

        <ButtonOption @click="hasChoosetopic = true"></ButtonOption>

        <div class="login-btn">
          <button class="login" @click="switchPage(router,'login')">
            <span>{{ loginMessage }}</span>
          </button>
        </div>

      </div>
      <div class="content">
        <AnswerQuestionsCard path="answer-question"></AnswerQuestionsCard>
        <AnswerQuestionsCard front-color="#d6a960" back-color="#60d66e" path="back-question">
          <template #front-title>开始背题</template>
          <template #front-content>依据自己设计的题进行答题，统计学习时间，进行背题。</template>
        </AnswerQuestionsCard>
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

  <div class="prompt" v-if="promptMessage.type">
    <PromptFrame :messageType="promptMessage.type">
      <template v-slot:[promptMessage.type]>{{ promptMessage.message }}</template>
    </PromptFrame>
  </div>


  <LookFileAnimate v-if="LookFileCom" :jsonMessages="jsonMessage" :fileName="fileData.fileName" @close-message="closeMessage">
    <template #title>查看模型渲染数据</template>
  </LookFileAnimate>

  <ComOptionModal v-if="hasChoosetopic" @close-message="closeMessage"></ComOptionModal>

</template>

<style scoped>
  @import "@/assets/public.css";
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button{
    height: 60px;
  }

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
  .container-con .left .int-content{
    display: flex;
    justify-content: center;
    align-items: center;
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
  .container-con .left .int-content input{
    border:2px solid #000;
    line-height: 45px;
  }
  .container-con .file-data h2{
    line-height: 45px;
  }
  .container-con .file-data{
    padding:15px;
    border:2px dashed #ccc;
    border-radius: 10px;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .container-con .right .content{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 50px;
    justify-items: center;
  }



  /* 登录按钮 */
  .column .login {
    outline: none;
    background: transparent;
    position: relative;
    overflow: hidden;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 3px solid rgb(36, 41, 46);
    border-radius: 20px;
    color: rgb(36, 41, 46);
    transition: color 0.3s 0.1s ease-out;
    text-align: center;
    margin-right: 2rem;
  }

  .column .login span {
    margin: 10px;
  }

  .column .login::before {
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

  .column .login:hover {
    color: #fff;
    border: 3px solid rgb(36, 41, 46);
  }

  .column .login:hover::before {
    box-shadow: inset 0 0 0 10em rgb(36, 41, 46);
  }

  /* 提示框 */

  /* 文件输入 */
  .custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
  }

  .custum-file-upload input {
    display: none;
  }

  .btn{
    margin-left:60% ;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .mar{
    margin-top: 20px;
  }
  
  @media (max-width: 1440px) {
    .container-con .right .content{
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 50px;
      justify-items: center;
    }
  }
</style>