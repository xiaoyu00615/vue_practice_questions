<script setup>
  import {
      userData,userDataHover,
      aiConfig,aiConfigHover,
      userPass,edit,del
  } from '@/assets/settingIng.ts'

  import {user} from '@/assets/resources.js'
  import {onMounted, reactive, ref, watch} from "vue";
  import {delDemoClass, readingArrData, saveArrData} from "@/utils/utils.js";
  import {localStorageLoginUser,localStorageAiConfig} from "@/utils/config.js";
  import PromptFrame from "@/components/PromptFrame.vue";


  const choose = ref(0)
  const userImg = ref(user)

  const userMessage = readingArrData(localStorageLoginUser)

  const aiConfigObj = reactive({
    AiName : '',
    AppId : '',
    ApiKey : '',
    AplSecret : '',
    AplUrl : '',
    AplUrlHost : ''
  })

  const promptMessage = reactive({
    type :'',
    message:'',
  })
  const timer = ref(null)
  watch(promptMessage,(newValue,oldValue)=>{
    // console.log(newValue,oldValue)
    if (timer.value){
      clearTimeout(timer.value)
    }

    timer.value = setTimeout(()=>{
      promptMessage.type = ''
    },3000)
  })


  function userClick(event){


    delDemoClass('.list-configuration')


    let activeDemo = event.target
    if (event.target.tagName === 'SPAN') {
      activeDemo = event.target.parentNode
    }
    activeDemo.classList.add('active')
    choose.value = Number(activeDemo.dataset.item)
    console.log(choose.value)
  }


  //

  function submitAiConfig(){

    if (aiConfigObj.AiName === '' &&
        aiConfigObj.AppId === '' &&
        aiConfigObj.ApiKey === '' &&
        aiConfigObj.AplSecret === "" &&
        aiConfigObj.AplUrl === "" &&
        aiConfigObj.AplUrlHost === ""){
      // console.log("无法保存，请重新填写配置，至少一项")
      promptMessage.type = 'warning'
      promptMessage.message = '无法保存，请重新填写配置，至少一项'
      return
    }

    saveArrData(localStorageAiConfig,aiConfigObj)

    promptMessage.type = 'success'
    promptMessage.message = '成功！配置已生效！'
  }

  onMounted(()=>{
    try {
      let configData = readingArrData(localStorageAiConfig)
      Object.assign(aiConfigObj,configData)
    }catch (e){
      console.log(e)
    }
  })



</script>

<template>
  <div class="container-com">
    <div class="sidebar">
      <h2>设置</h2>
      <input placeholder="搜索设置">
      <div class="list-configuration">
        <div class="configuration user-data active" data-item="0" @click="userClick"><img :src="choose === 0 ? userDataHover : userData" alt=""><span>用户资料</span></div>

        <div class="configuration setting-ai" data-item="1" @click="userClick"><img :src="choose === 1 ? aiConfigHover:aiConfig" alt=""> <span>AI 配置</span></div>
      </div>
    </div>
    <div class="setting-content">
      <div class="public-content" v-if="choose === 0">
        <h3>个人资料</h3>

        <div class="user-content">
          <div class="del-box">
            <div class="user-card">
              <div class="user-img"><img :src="userImg" alt=""></div>
              <div class="user-info">
                <p>{{ userMessage.userName ? userMessage.userName : "暂未登录"}}</p>
                <p class="email">{{ userMessage.email ? userMessage.email : "暂未填写邮箱" }}</p>
                <p>账号状态正常</p>
              </div>
            </div>
            <div class="tool">
              <div class="edit size"><img :src="edit" alt=""></div>
              <div class="del size"><img :src="del" alt=""></div>
              <div class="exit">退出登录</div>
            </div>
          </div>

          <div class="management-user"><img :src="userPass" alt="">
            <span>管理账户</span>
          </div>
        </div>
      </div>
      <div class="public-content" v-if="choose === 1">
        <h3>AI 配置</h3>

        <div class="user-content aiContent">
          <div class="warn">
            注：AI 配置可能涉及隐私，请不要泄露。
          </div>
          <div class="itemContent aiName">
            <label for="aiName">1.AI 名称:</label>
            <input v-model="aiConfigObj.AiName" type="text" placeholder="鱼助手... 起一个好名字吧！" id="aiName">
          </div>
          <div class="itemContent appid">
            <label for="appId">2.APPID:</label>
            <input v-model="aiConfigObj.AppId" type="text" placeholder="9b897..." id="appId">
          </div>
          <div class="itemContent appKey">
            <label for="appKey">3.APIKEY:</label>
            <input v-model="aiConfigObj.ApiKey" type="text" placeholder="46sd30ebb5467hj07afe4e67f8f8f..." id="appKey">
          </div>
          <div class="itemContent ApiSecret">
            <label for="ApiSecret">4.APISECRET:</label>
            <input v-model="aiConfigObj.AplSecret" type="text" placeholder="ODdkZDlYM2YwKGQxOTPmLjoySjcwN..." id="ApiSecret">
          </div>
          <div class="itemContent Api-url">
            <label for="Api-url">5.API_URL:</label>
            <input v-model="aiConfigObj.AplUrl" type="text" placeholder="https://spark-api.xf-yun.com/v1.1/chat" id="Api-url">
          </div>
          <div class="itemContent url-host">
            <label for="url-host">6.API_URLHOST:</label>
            <input v-model="aiConfigObj.AplUrlHost" type="text" placeholder="/spark-api.xf-yun.com" id="url-host">
          </div>

          <div class="Instructions">
            ps: 使用AI 配置时请注意，以上内容均可以在，各大AI 模型控制台中找到。<br>
            我使用的是讯飞星火知识大模型 Spark Lite。<br>
            讯飞官网:https://www.xfyun.cn/<br>
            控制台：https://console.xfyun.cn/services/sparkapiCenter?id=15
          </div>

          <div class="complete" @click="submitAiConfig">
            <img :src="aiConfig" alt=""> <span>保存配置</span>
          </div>
        </div>

      </div>

    </div>

  </div>
  <div class="prompt" v-if="promptMessage.type">
    <PromptFrame :messageType="promptMessage.type">
      <template v-slot:[promptMessage.type]>{{ promptMessage.message }}</template>
    </PromptFrame>
  </div>

</template>

<style scoped>
  @import "@/assets/public.css";
  @import "@/assets/settingCss/userMessage.css";
  @import "@/assets/settingCss/aiSetting.css";
  .container-com{
    height: 100vh;
    width: 100%;
    display: flex;
  }
  .sidebar{
    height: 100%;
    overflow: hidden;
    border-right: 2px solid #ccc;
    width: 20%;
    padding: 25px 20px;
  }
  .sidebar input{
    border:2px solid #ccc;
    border-bottom: 3px solid #ccc;
    box-shadow: 0 2px 5px 0 #ccc;
    height: 25px;
    padding-left: 10px;
    width: 100%;
    font-size: 12px;
    margin: 15px 0 0 0;
  }
  .list-configuration{
    margin-top: 10px;
  }

  .list-configuration .configuration{
    height: 30px;
    line-height:30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    margin: 2px 0 ;
  }

  .list-configuration .configuration:hover{
    background: #f2f2f2;
  }
  .list-configuration .configuration img{
    height: 15px;
    width: 15px;
    margin: 0 10px 0 18px;
  }


  .container-com .setting-content{
    width: 80%;
    height: 100%;
    overflow: hidden;
  }
  .container-com .setting-content .public-content{
    padding: 35px 35px;
    height: 100vh;
    overflow-y: auto;
  }





</style>