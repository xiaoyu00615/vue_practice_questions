<script setup lang="ts">
  defineProps({
    frontColor:{
      type:String,
      default:'#b2d642'
    },
    backColor:{
      type:String,
      default:'#42b2d6'
    }
  })
</script>

<template>
  <div class="item">
    <div class="card">
      <div class="front" :style="{background: frontColor}">
        <h3>
          <slot name="front-title">普通答题</slot>
        </h3>
        <p>
          <slot name="front-content">依据选定文档进行答题，内有计时，判断答题情况等功能使用。</slot>
        </p>
      </div>
      <div class="back" :style="{background: backColor}">
        <h3><slot name="back-title">注意事项</slot></h3>
        <p><slot name="back-content">进入后会开始计时，直接退出会失去答题进度（建议提交后退出！）</slot></p>
        <h2 class="back-line" :style="{
          borderStyle : 'dashed',
          borderWidth : '2px',
          borderColor : backColor
         }">开始 GO!</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
   .item {
    width: 200px;
    height: 300px;
    overflow: hidden;
    position: relative;
  }
   .item h3{
    line-height: 40px;
    border-bottom: 3px solid #000;
    margin-bottom: 15px;
  }
   .item p{
    text-indent: 2em;
    padding: 0 5px;
  }
   .item h2{
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    margin-top: 40px;
  }
    .item h2:hover{
    border: 2px dashed #fff !important;
  }
    .item .card{
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform .5s ease-in-out;
  }
    .item .card .front,
    .item .card .back{
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    position: absolute;
    padding: 15px;
    font-size: 16px;
    text-align: left;
  }
    .item .card:hover{
    transform: rotateY(180deg);
  }
    .item .card .front{
    border-top: 3px solid #333;
    border-left: 5px solid #333;

    border-bottom: 5px solid #555;
    border-right: 3px solid #999;

  }

    .item .card .back{
    transform: rotateY(180deg);
    border-top: 3px solid #333;
    border-left: 5px solid #333;

    border-bottom: 5px solid #555;
    border-right: 3px solid #999;

  }

</style>