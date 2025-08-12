<script setup>

</script>

<template>
  <button
      class="ai-button group relative outline-0 cursor-pointer transition-transform duration-200 active:scale-[0.95] aspect-square"
  >
    <svg
        class="ai-icon animate-pulse absolute z-10 overflow-visible transition-all duration-300 text-[#ffea50] group-hover:text-white"
        stroke="none"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
      ></path>
    </svg>
    <span class="ai-text font-extrabold leading-none text-white transition-all duration-200 group-hover:opacity-0">
      <slot>AI</slot>
    </span>
  </button>
</template>

<style scoped>
.ai-button {
  /* 基础尺寸变量 */
  --sz-btn: 68px;
  --space: calc(var(--sz-btn) / 5.5);
  --gen-sz: calc(var(--space) * 2);
  --sz-text: calc(var(--sz-btn) - var(--gen-sz));

  /* 按钮尺寸 */
  width: var(--sz-btn);
  height: var(--sz-btn);

  /* 边框与圆角 */
  border: solid 1px transparent;
  border-radius: 1rem;

  /* 布局 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 背景与阴影 */
  background: linear-gradient(45deg, #efad21, #ffd60f);
  box-shadow:
      rgba(60, 64, 67, 0.3) 0 1px 2px 0,
      rgba(60, 64, 67, 0.15) 0 2px 6px 2px,
      rgba(0, 0, 0, 0.3) 0 30px 60px -30px,
      rgba(52, 52, 52, 0.35) 0 -2px 6px 0 inset;
}

.ai-icon {
  /* 图标尺寸与位置 */
  width: var(--gen-sz);
  height: var(--gen-sz);
  top: calc(var(--sz-text) / 7);
  left: calc(var(--sz-text) / 7);
}

/* 鼠标悬停时的图标样式 */
.group:hover .ai-icon {
  width: var(--sz-text);
  height: var(--sz-text);
  left: calc(var(--sz-text) / 4);
  top: calc(var(--gen-sz) / 2);
}

.ai-text {
  /* 文本尺寸 */
  font-size: var(--sz-text);
}
</style>
