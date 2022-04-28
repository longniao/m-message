<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { getCurrentInstance, reactive } from 'vue'
import message, { MessageOptions } from '../../src'

const intance = getCurrentInstance()
console.log(intance)
message.info('Wellcome here !', { duration: -1, ctx: intance?.appContext })

const state: any = reactive<MessageOptions>({
  title: '',
  content: 'This is content !',
  type: 'info',
  // width: '350px',
  position: '',
  hasMask: false,
  isCollapsed: false,
  closable: true,
  duration: 3000,
  className: 'test',
  wrapperClassName: 'wtest',
  onClose () {
    console.log('close')
  }
})

const handleMessage = () => {
  const msg = message({ ...state })
  console.log(msg)
}
</script>

<template>
  <div class="box">
    <label>
      Title <input v-model="state.title" class="m-input" placeholder="Title"/>
    </label><br/>
    <label>
      Content <textarea v-model="state.content" placeholder="Content"></textarea>
    </label><br/>
    
    <label>
      Type
      <select class="m-input" v-model="state.type">
        <option value="">None</option>
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
        <option value="loading">Loading</option>
      </select>
    </label>
    <label>
      Position
      <select class="m-input" v-model="state.position">
        <option value="">None</option>
        <option value="top-left">top-left</option>
        <option value="top-center">top-center</option>
        <option value="top-right">top-right</option>
        <option value="center">center</option>
        <option value="bottom-left">bottom-left</option>
        <option value="bottom-center">bottom-center</option>
        <option value="bottom-right">bottom-right</option>
      </select>
    </label>
    <label>
      Mask
      <select class="m-input" v-model="state.hasMask">
        <option :value="false">No-mask</option>
        <option :value="true">Has-mask</option>
      </select>
    </label>
    <br>
    <label>
      Duration <input v-model="state.duration" type="number" class="m-input" placeholder="Duration"/>
    </label>
    <button @click="handleMessage" class="m-btn">Show Message</button>
  </div>
</template>

<style lang="less">
body {
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  font-size: 15px;
  color: #121212;
  background-color: #07a56a;

  &::after {
    content: "A message plugin for Vue 3 A message plugin for Vue 3";
    position: absolute;
    font-size: 10rem;
    color: rgba(0, 0, 0, 0.13);
    padding: 50px;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
.box {
  background: #fff;
  border-radius: 5px;
  width: 350px;
  padding: 15px;
}
</style>
