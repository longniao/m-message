<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { getCurrentInstance, reactive, h } from 'vue'
import message, { MessageOptions } from '../../src'

const myIconUrl = 'https://avatars.githubusercontent.com/u/11366654?s=40&v=4'
const intance = getCurrentInstance()
console.log(intance)
// message.info('Wellcome here !', { duration: -1, ctx: intance?.appContext })
// message.info(h('div', 'Wellcome here !'), { duration: -1 })
message.info(() => h('div', 'Wellcome here !'), { duration: -1, iconURL: myIconUrl })

const state: any = reactive<MessageOptions>({
  title: '',
  content: 'Hi <b>Boy(Girl)</b>! This is content !',
  type: 'info',
  // width: '350px',
  iconURL: '',
  position: '',
  hasMask: false,
  isCollapsed: false,
  collapsable: false,
  closable: true,
  supportHTML: false,
  duration: 3000,
  className: 'test',
  wrapperClassName: 'wtest',
  onClose () {
    console.log('close')
  },
  onCollapsed (collapsed) {
    console.log('collapsed:', collapsed)
  }
})

const handleMessage = () => {
  const msg = message({ ...state })
  console.log(msg)
}
</script>

<template>
  <div class="box">
    <div><strong>Vue Message Playground</strong></div><br/>
    <table>
      <thead><td width="80"></td><td></td></thead>
      <tbody>
        <tr>
          <td>Type</td>
          <td>
            <select class="m-input" v-model="state.type">
              <option value="">None</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="loading">Loading</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Title</td>
          <td><input v-model="state.title" class="m-input" placeholder="Title"/></td>
        </tr>
        <tr>
          <td>Content</td>
          <td><textarea v-model="state.content" placeholder="Content"></textarea></td>
        </tr>
        <tr>
          <td>Duration</td>
          <td><input v-model="state.duration" type="number" class="m-input" placeholder="Duration"/></td>
        </tr>
        <tr>
          <td>Icon URL</td>
          <td>
            <input v-model="state.iconURL" class="m-input" placeholder="Icon URL"/>
            <label>
              <input type="checkbox" @click="state.iconURL = state.iconURL ? '' : myIconUrl"> Use imgage
            </label>
          </td>
        </tr>
        <tr>
          <td>ClassName</td>
          <td><input v-model="state.className" class="m-input" placeholder="ClassName"/></td>
        </tr>
        <tr>
          <td>wrapperClassName</td>
          <td><input v-model="state.wrapperClassName" class="m-input" placeholder="WrapperClassName"/></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Position</td>
          <td>
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
          </td>
        </tr>
        <tr>
          <td>Mask</td>
          <td><label><input type="checkbox" v-model="state.hasMask" /> hasMask</label></td>
        </tr>
        <tr>
          <td>IsCollapsed</td>
          <td><label><input type="checkbox" v-model="state.isCollapsed" /> IsCollapsed</label></td>
        </tr>
        <tr>
          <td>Collapsable</td>
          <td><label><input type="checkbox" v-model="state.collapsable" /> Collapsable</label></td>
        </tr>
        <tr>
          <td>Closable</td>
          <td><label><input type="checkbox" v-model="state.closable" /> Closable</label></td>
        </tr>
        <tr>
          <td>SupportHTML</td>
          <td><label><input type="checkbox" v-model="state.supportHTML" /> SupportHTML</label></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <p></p>
            <button @click="handleMessage" class="m-btn">Show Message</button>
          </td>
        </tr>
      </tbody>
    </table>
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
  width: 400px;
  padding: 15px;
}
</style>
