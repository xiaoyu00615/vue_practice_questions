<script setup>
  defineProps({
    messageType:{
      type:String,
      default:'success'
    }
  })
</script>
<style>
  @import "@/assets/tailwind.css";

</style>

<template>
  <div class="space-y-2 p-4">
  <!--  成功  -->
    <div v-if="messageType === 'success'"
        role="alert"
        class="cursor-pointer bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-5 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
    >
      <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-7 w-7 flex-shrink-0 mr-2 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
        ></path>
      </svg>
      <p class="cursor-text font-semiboldb pl-2 text-base">
        成功 - <slot name="mes_success">执行完毕，已响应</slot>
      </p>
    </div>

    <!-- 信息  -->
    <div v-if="messageType === 'info'"
        role="alert"
        class="cursor-pointer bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100 p-5 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105"
    >
      <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-7 w-7 flex-shrink-0 mr-2 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
        ></path>
      </svg>
      <p class="cursor-text font-semiboldb pl-2 text-base">
        信息 - <slot name="mes_info">有新的信息，注意查收！</slot>
      </p>
    </div>

    <!-- 警告 -->
    <div v-if="messageType === 'warning'"
        role="alert"
        class="cursor-pointer bg-yellow-100 padd dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 p-5 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-yellow-200 dark:hover:bg-yellow-800 transform hover:scale-105"
    >
      <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-7 w-7 flex-shrink-0 mr-2 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
        ></path>
      </svg>
      <p class="cursor-text font-semiboldb pl-2 text-base">
        警告 - <slot name="mes_warning">这样做可能会产生一些不可控影响！</slot>
      </p>
    </div>

    <div v-if="messageType === 'error'"
        role="alert"
        class="cursor-pointer bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-5 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
    >
      <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-7 w-7 flex-shrink-0 mr-2 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
        ></path>
      </svg>
      <p class="cursor-text font-semiboldb pl-2 text-base">
        错误 - <slot name="mes_error">产生错误，错误信息！</slot>
      </p>
    </div>
  </div>
</template>
