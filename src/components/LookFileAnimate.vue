<script setup>
  const props = defineProps({
    jsonMessages: {
      default:'success'
    }
  })

  console.log(props.jsonMessages)
</script>

<template>
  <div class="mask">
    <div class="modal">
      <p class="content-title"><slot>处理模型</slot></p>

      <div class="topics">
          <div class="item-topic" v-for="item in jsonMessages">
            <p class="title">{{ item.title }}</p>
            <div class="options">
              <p class="item-option" v-for="option in item.options">{{ option }}</p>
            </div>
          </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .mask{
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.3);
    position:fixed;
    top:0;
  }

  .mask .modal{
    width: 80%;
    height: 80%;
    background: #fff;
    transform: translate(-50%,-50%);
    top:50%;
    left: 50%;
    border-radius: 20px;
    position: relative;
    padding: 25px;
    overflow-y: auto;
  }

  .mask .modal .content-title{
    font-size: 24px;
    text-align: center;
  }

  .mask .modal .topics .item-topic{
    padding: 8px 0px;
    border-bottom: 2px dashed #000;
  }

  .mask .modal .topics .item-topic .options{
    margin-top: 5px;
  }

  .mask .modal .topics .item-topic .options .item-option{
    text-indent: 2em;
  }
</style>