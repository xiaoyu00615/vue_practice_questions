<script setup>
  import {switchPage} from "@/utils/public.js";
  import {useRouter} from "vue-router";

  import {reactive, ref, watch} from 'vue'
  import PromptFrame from "@/components/PromptFrame.vue";
  import {randomCode, readingArrData, saveArrData} from "@/utils/utils.js";
  import {onMounted} from "vue";

  const code = ref('kHi4D7')



  const intValue = reactive({
    userName:'',
    email:'',
    password:'',
    repeatPassword:'',
    codeId:''
  })
  const promptMessage = reactive({
    type :'',
    message:'',
  })
  const router = useRouter()

  let allUser = reactive([])

  onMounted(()=>{
    code.value = randomCode()

    if (!readingArrData('allUser')){
      allUser = []
      return
    }

    allUser = readingArrData('allUser')

  })

  // 创建新的验证码
  function crateCode(hasShow = true){
    code.value = randomCode()
    if (!(code.value.length > 0 && code.value)){
      code.value = '错误重新刷新'
      promptMessage.type = 'error'
      promptMessage.message = '验证码获取失败，请刷新此网页！'
    }

    // 判断要不要显示出来
    if (hasShow){
      promptMessage.type = 'success'
      promptMessage.message = '验证码刷新成功！'
    }

  }

  watch(promptMessage,()=>{
    setTimeout(()=>{
      promptMessage.hasShow = true
      promptMessage.type = ''
    },3000)
  })

  function registerUser(){
    // console.log(intValue)
    // 填写信息不能为空
    if (!intValue.userName && !intValue.password && !intValue.repeatPassword && !intValue.codeId) {
      promptMessage.type = 'warning'
      promptMessage.message = '填写关键信息不能为空！'
      return
    }

    // 判断密码输入是否合法
    console.log(intValue.password !== intValue.repeatPassword)
    if (intValue.password !== intValue.repeatPassword){
      promptMessage.type = 'error'
      promptMessage.message = '密码填写有误，不相同！！'
      return;
    }

    // 判断验证码输入正确
    console.log(intValue.codeId , code.value)
    if(intValue.codeId !== code.value){
      promptMessage.type = 'error'
      promptMessage.message = '验证码填写错误，重新填写！'

      crateCode(false)

      return;
    }

    // console.log("输入合法")
    allUser.push(intValue)
    saveArrData('allUser',allUser)
    promptMessage.type = 'success'
    promptMessage.message = '账号注册成功！'

    // 清空输入框
    Object.assign(intValue,{
      userName:'',
      email:'',
      password:'',
      repeatPassword:'',
      codeId:''
    })

  }



</script>


<template>
  <div class="form-container">
    <p class="title">Register</p>
    <form class="form">

      <div class="wave-group">
        <input required type="text" class="input" v-model="intValue.userName">
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">用</span>
          <span class="label-char" style="--index: 1">户</span>
          <span class="label-char" style="--index: 2">名</span>
          <span class="label-char" style="--index: 3">：</span>
        </label>
      </div>

      <div class="wave-group">
        <input required type="text" class="input" v-model="intValue.email">
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">E</span>
          <span class="label-char" style="--index: 1">-</span>
          <span class="label-char" style="--index: 2">mail</span>
          <span class="label-char" style="--index: 3">：</span>
        </label>
      </div>

      <div class="wave-group">
        <input required type="password" class="input" v-model="intValue.password">
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">密</span>
          <span class="label-char" style="--index: 1">码</span>
          <span class="label-char" style="--index: 2">：</span>
        </label>
      </div>

      <div class="wave-group">
        <input required type="password" class="input" v-model="intValue.repeatPassword">
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">相</span>
          <span class="label-char" style="--index: 1">同</span>
          <span class="label-char" style="--index: 2">密</span>
          <span class="label-char" style="--index: 3">码</span>
          <span class="label-char" style="--index: 4">：</span>
        </label>
      </div>

      <div class="wave-group flex">
        <div class="int-content">
          <input required type="text" class="input" v-model="intValue.codeId">
          <span class="bar"></span>
          <label class="label">
            <span class="label-char" style="--index: 0">验</span>
            <span class="label-char" style="--index: 1">证</span>
            <span class="label-char" style="--index: 2">码</span>
            <span class="label-char" style="--index: 3">：</span>
          </label>
        </div>
        <div class="code" @click="crateCode">
          {{ code }}
        </div>
      </div>
      <button class="sign" @click.prevent="registerUser">注册</button>
    </form>

    <button class="sign back" @click="switchPage(router,'login')">返回登录</button>
  </div>

  <div class="prompt" v-if="promptMessage.type">
    <PromptFrame :messageType="promptMessage.type">
      <template v-slot:[promptMessage.type]>{{ promptMessage.message }}</template>
    </PromptFrame>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";

  .form-container {
    width: 450px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
    position: absolute;
    transform: translate(-50%,-50%);
    top:50%;
    left: 50%;
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250);
  }



  .forgot_password a,.forgot_password a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot_password a:hover, .forgot_password a:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: rgba(167, 139, 250, 1);
    padding: 0.75rem;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
  }


  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }




  .wave-group {
    position: relative;
    height: 80px;

  }

  .wave-group .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
  }

  .wave-group .input:focus {
    outline: none;
  }

  .wave-group .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
  }

  .wave-group .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * .05s);
  }

  .wave-group .input:focus ~ label .label-char,
  .wave-group .input:valid ~ label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: #5264AE;
  }

  .wave-group .bar {
    position: relative;
    display: block;
  }

  .wave-group .bar:before,.wave-group .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264AE;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .wave-group .bar:before {
    left: 50%;
  }

  .wave-group .bar:after {
    right: 50%;
  }

  .wave-group .input:focus ~ .bar:before,
  .wave-group .input:focus ~ .bar:after {
    width: 50%;
  }


  .wave-group .int-content{
    width: 70%;
    padding-right: 10%;
  }

  .wave-group .code{
    width: 30%;
    height: 40px;
    border:2px dashed #999;
    text-align: center;
    line-height: 40px;
    letter-spacing: 4px;
    cursor: pointer;
  }

  .wave-group .code:hover{
    color: #ccc;
    border:2px dashed #fff;
  }



  .social-icons button{
    cursor: pointer;
  }


  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }


  .flex{
    display: flex;
    justify-content: space-between;
  }

  .back{
    margin-top: 20px;
  }

</style>





