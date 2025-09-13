<script setup>
  import {setting,settingHover} from '@/assets/resources.js'
  import {ref} from "vue";

  const imgSetting = ref(setting)

</script>

<style scoped>
 @import "@/assets/public.css";
.checkbox-front{
  width: 60px;
  height: 60px;
  border-radius: 12px;
  transition: 0.5s;
  position: relative;
  cursor: pointer;
}

.checkbox-front img{
  width: 60%;
  height: 60%;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
}
.checkbox-front:hover{
  background: rgb(81, 81, 81);
}




</style>

<template>
    <div class="checkbox-wrapper scale-primary-1">
        <div class="checkbox-front" @mouseenter="imgSetting = settingHover" @mouseleave="imgSetting = setting">
          <img :src="imgSetting" alt="">
        </div>
    </div>
</template>
