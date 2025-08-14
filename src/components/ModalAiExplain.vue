<script setup>
  import {close, closeHover} from "@/assets/resources";
  import {ref,reactive,watch} from "vue";
  import ButtonSave from "@/components/ButtonSave.vue";
  import {readingArrData, saveArrData} from "@/utils/utils.js";
  import { sparkChatStream } from '@/utils/sparkApi.js';
  import {localStorageCurrentOptions, localStorageTopicAll} from "@/utils/config.js";
  import {useRouter} from "vue-router";

  const props = defineProps({
    currentIndex:{
      type:Number,
      default:0
    },
    jsonData:{
      type:[Array,Object]
    },
    currentFileName:{
      default:''
    }
  })

  const router = useRouter()
  const title = props.jsonData[props.currentIndex].title
  const option = props.jsonData[props.currentIndex].options.join()

  // const answerStr = `帮我解答一下这道题，题目是${title}，选项是${option},帮我解答题目
  //     以--title:解答标题内容
  //     以--options:解答选项
  //     以--summarize:解答总结全部
  //     以--author:作者信息`

  const answerStr = `帮我解答一下这道题，题目是${title}。选项是${option}。尽量详细并清晰简练的回答。`



  const userName = ref(null)
  // 判断没有登录状态
  try {
    userName.value = readingArrData('loginUser').userName
  }catch (err){
    console.log(err)
    userName.value = null
  }

  const toggleImgCLose = ref(close)
  const emit = defineEmits(['close-message','prompt-message'])

  function Message(event,value){
    emit(event,value)
  }

  // 聊天记录引用（用于滚动到底部）
  const chatHistoryRef = ref(null);
  // 对话历史
  const messages = ref([
    { role: 'assistant', content: '你好！我是基于讯飞星火大模型的助手，有什么可以帮你？' }
  ]);
  // 用户输入
  const askQuestionStr = ref(answerStr);
  // 加载状态
  const loading = ref(false);
  // WebSocket连接关闭函数
  let closeConnection = null;

  // 自动滚动到底部
  const scrollToBottom = () => {
    nextTick(() => {
      if (chatHistoryRef.value) {
        chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight;
      }
    });
  };

  // 监听消息变化，自动滚动
  watch(messages, scrollToBottom);

  // 发送消息
  const sendMessage = async () => {
    console.log('发送')
    const userInput = askQuestionStr.value.toString().trim();
    if (!userInput || loading.value) return;

    // 关闭可能存在的旧连接
    if (closeConnection) {
      closeConnection();
    }

    // 添加用户消息
    messages.value.push({ role: 'user', content: userInput });
    askQuestionStr.value = '';
    loading.value = true;

    // 添加AI消息占位
    const aiMsgIndex = messages.value.length;
    messages.value.push({ role: 'assistant', content: '' });

    try {
      // 提取历史对话（排除当前用户消息和AI占位）
      const history = messages.value
          .filter((_, index) => index < messages.value.length - 1)
          .map(({ role, content }) => ({ role, content }));

      // 调用流式API，实时更新内容
      closeConnection = sparkChatStream(userInput, history, (chunk) => {
        messages.value[aiMsgIndex].content += chunk;
      });
    } catch (error) {
      // 显示错误信息
      messages.value[aiMsgIndex].content = `❌ ${error.message}`;
    } finally {
      loading.value = false;
    }
    console.log(messages.value)
  };

  function saveNoteMessage(){
    const lastMessageLength = messages.value.length
    const lastMessage = messages.value[lastMessageLength-1]
    const allTopic = readingArrData(localStorageTopicAll)

    const currentJson = readingArrData(localStorageCurrentOptions)
    // console.log(allTopic)

    // console.log(lastMessage)
    if(!lastMessage.role) return


    console.log(currentJson)
    // 最后一句话保存
    // console.log(lastMessage.content)
    currentJson.explain.explainAi[props.currentIndex] = lastMessage.content

    console.log(currentJson)

    saveArrData(localStorageCurrentOptions,currentJson)

    const filterArr = allTopic.filter((item) => {
      return !item[props.currentFileName]
    })



    filterArr.unshift(currentJson)
    // console.log(currentJson)
    // console.log(filterArr)


    saveArrData(localStorageTopicAll,filterArr)

    // 返回消息
    Message('prompt-message',{
      type:'success',
      message:'Ai 笔记保存成功！'
    })

    Message('close-message',false)
  }


  // 组件卸载时关闭连接
  const onUnmounted = (callback) => {
    window.addEventListener('beforeunload', callback);
    return () => window.removeEventListener('beforeunload', callback);
  };

  onUnmounted(() => {
    if (closeConnection) {
      closeConnection();
    }
  });


</script>

<template>
  <div class="mask">
    <div class="container-modal">

      <div class="modal">
        <div class="img-close btn pos" @click="Message('close-message',false)">
          <img :src="toggleImgCLose" @mouseleave="toggleImgCLose = close" @mouseenter="toggleImgCLose = closeHover" alt="">
        </div>
        <p class="content-title"><slot name="title">Ai 解释</slot></p>

        <div class="--content">
          <div class="chat-content">
            <div
                v-for="(msg, index) in messages"
                :key="index"
                :class="['message', msg.role]"
            >
              <div class="avatar">{{ msg.role === 'user' ? userName ? userName[0] : '我' : 'AI' }}</div>
              <div class="content">{{ msg.content }}</div>
            </div>
          </div>
          <div class="int-content">
            <textarea
                @keydown.enter.prevent="sendMessage"
                :disabled="loading"
                placeholder="输入当前题目想要问的问题"
                v-model="askQuestionStr"
            ></textarea>
            <button
                @click="sendMessage"
                :disabled="!askQuestionStr.trim() || loading"
            >
              <span v-if="loading">思考中...</span>
              <span v-else>发送</span>
            </button>
          </div>
        </div>

        <div class="flex-center">
          <ButtonSave @click="saveNoteMessage">保存此题最后一条笔记</ButtonSave>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "@/assets/public.css";
  @import "@/assets/modal.css";


  .modal{
    background: #f9fafb;
  }
  .--content{
    height: 75%;
    overflow: hidden;
    margin-top: 25px;
    border-radius: 10px;
    background: #f9fafb;
    border:2px solid #06c8d9;
    padding: 20px 0 0 0;
  }
  .--content .chat-content{
    height: 80%;
    overflow-y: scroll;
  }
  .--content .int-content{
    display: flex;
    height: 20%;
  }
  .--content .int-content textarea{
    height: 100%;
    width: 90%;
    padding-left: 2em;
    border-top: 2px solid #000;
  }
  .--content .int-content button{
    width: 10%;
    cursor: pointer;
    font-size: 20px;
  }



  .message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    animation: fadeIn 0.3s ease;
    padding: 0 20px;
  }

  .user{
    flex-direction: row-reverse
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #42b983;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: 600;
  }

  .message.user .avatar {
    background-color: #3b82f6;
  }

  .content {
    padding: 10px 14px;
    border-radius: 18px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    line-height: 1.5;
    max-width: 80%;
  }

  .message.user .content {
    background-color: #e0f2fe;
  }

  button {
    padding: 0 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover:not(:disabled) {
    background-color: #359e6d;
  }

  button:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }

  textarea {
    flex: 1;
    min-height: 100px;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
  }

  textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  textarea:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }


</style>