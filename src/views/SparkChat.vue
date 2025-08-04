<template>
  <div class="spark-chat">
    <ButtonBack class="back-size btn-back-size" @click="switchPage(router,'')"></ButtonBack>
    <!-- 聊天记录 -->
    <div class="chat-history" ref="chatHistoryRef">
      <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role]"
      >
        <div class="avatar">{{ msg.role === 'user' ? userName ? userName[0] : '我' : 'AI' }}</div>
        <div class="content">{{ msg.content }}</div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <textarea
          v-model="prompt"
          placeholder="请输入问题..."
          @keydown.enter.prevent="sendMessage"
          :disabled="loading"
      ></textarea>
      <button
          @click="sendMessage"
          :disabled="!prompt.trim() || loading"
      >
        <span v-if="loading">思考中...</span>
        <span v-else>发送</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, nextTick, watch } from 'vue';
  import { sparkChatStream } from '@/utils/sparkApi.js';
  import {readingArrData} from "@/utils/utils.js";
  import ButtonBack from "@/components/ButtonBack.vue";
  import {switchPage} from "@/utils/public.js";
  import {useRouter} from "vue-router";

  const router = useRouter()

  const userName = ref(null)
  // 判断没有登录状态
  try {
    userName.value = readingArrData('loginUser').userName
  }catch (err){
    console.log(err)
    userName.value = null
  }


  // 聊天记录引用（用于滚动到底部）
  const chatHistoryRef = ref(null);
  // 对话历史
  const messages = ref([
    { role: 'assistant', content: '你好！我是基于讯飞星火大模型的助手，有什么可以帮你？' }
  ]);
  // 用户输入
  const prompt = ref('');
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
    const userInput = prompt.value.toString().trim();
    if (!userInput || loading.value) return;

    // 关闭可能存在的旧连接
    if (closeConnection) {
      closeConnection();
    }

    // 添加用户消息
    messages.value.push({ role: 'user', content: userInput });
    prompt.value = '';
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
  };

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

<style scoped>
  @import "@/assets/public.css";

.spark-chat {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.chat-history {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9fafb;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  animation: fadeIn 0.3s ease;
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
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  line-height: 1.5;
}

.message.user .content {
  background-color: #e0f2fe;
}

.input-area {
  display: flex;
  gap: 12px;
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.back-size{
  width: 15%;
  position: absolute;
  right: -15%;
}
</style>
