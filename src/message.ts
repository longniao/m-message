import MessageComponent from './message.vue'
import { createVNode, h, render } from 'vue'
import type { AppContext } from 'vue'

export interface MessageOptions {
  type?: string
  title?: string
  content?: string
  iconURL?: string
  duration?: number
  isCollapsed?: boolean
  collapsable?: boolean
  supportHTML?: boolean
  hasMask?: boolean
  position?: '' | 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  width?: string
  className?: string
  wrapperClassName?: string
  closable?: boolean
  onClose?: () => void
  ctx?: AppContext
}

type MessageTypeOptions = Omit<MessageOptions, 'type'>
export interface MessageIntance {
  id: string
  close: () => void
}

export type MessageFn = (message: string, options?: MessageTypeOptions) => MessageIntance
export interface Message {
  (options: MessageOptions): MessageIntance
  info: MessageFn
  success: MessageFn
  error: MessageFn
  warning: MessageFn
  loading: MessageFn
  closeAll: () => void
  setGlobal: (options: MessageTypeOptions) => void
  setContext: (ctx: AppContext | null) => void
}

const instances: { id: string, close: () => void }[] = []
let seed = 0
const containers: {[key: string]: HTMLElement} = {}
let globalsOptions: MessageOptions = {}
let _context: AppContext | null = null

const message: Message = (options: MessageOptions) => {
  const id = 'm-message-' + seed++
  const props = {
    ...options,
    ...globalsOptions,
    id
  }

  const position = options.position || 'top-center'
  const hasMask = options.hasMask || false
  const containerKey = position + (hasMask ? '-mask' : '')
  let containerEl = containers[containerKey]

  if (!containerEl) {
    containerEl = containers[containerKey] = document.createElement('div')
    containerEl.className = [
      'm-message-container',
      'is-' + position,
      hasMask ? 'has-mask' : ''
    ].filter(function (e) { return !!e }).join(' ')
    document.body.appendChild(containerEl)
  }

  const vm = createVNode(MessageComponent, props)
  const div = document.createElement('div')

  vm.appContext = options.ctx || _context
  vm.props!.onClose = options.onClose
  vm.props!.onDestroy = () => {
    render(null, div)
  }

  render(vm, div)

  // for position of bottom-*
  if (position.indexOf('bottom') === 0 && containerEl.firstChild) {
    containerEl.insertBefore(div.firstElementChild!, containerEl.firstChild)
  } else {
    containerEl.appendChild(div.firstElementChild!)
  }

  const intance = {
    id,
    close () {
      vm?.component?.exposed?.close()
    }
  }

  instances.push(intance)
  return intance
}

message.success = (content: string, options?: MessageTypeOptions) => message({ ...options, type: 'success', content })
message.info = (content: string, options?: MessageTypeOptions) => message({ ...options, type: 'info', content })
message.warning = (content: string, options?: MessageTypeOptions) => message({ ...options, type: 'warning', content })
message.error = (content: string, options?: MessageTypeOptions) => message({ ...options, type: 'error', content })
message.loading = (content: string, options?: MessageTypeOptions) => message({ ...options, type: 'loading', content })

// Message.close = function (id, userOnClose) {
//   for (let i = 0, len = instances.length; i < len; i++) {
//     if (id === instances[i].id) {
//       const { containerKey, hasMask } = instances[i]
//       // 响应options.onClose
//       if (typeof userOnClose === 'function') {
//         userOnClose(instances[i])
//       }
//       instances[i] = null
//       instances.splice(i, 1)

//       // 如果开启遮罩，300ms 后移除容器（不移除白屏时间太长）
//       if (hasMask) {
//         setTimeout(function () {
//           const count = instances.filter(e => e.containerKey === containerKey).length
//           if (count === 0 && containers[containerKey]) {
//             containers[containerKey].remove()
//             containers[containerKey] = null
//           }
//         }, 300)
//       }
//       break
//     }
//   }

//   setTimeout(function () {
//     // 当前没有消息后，移除容器
//     if (instances.length === 0) {
//       for (let type in containers) {
//         if (containers[type]) {
//           containers[type].remove()
//           containers[type] = null
//         }
//       }
//     }
//   }, 3000)
// }

message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

// global options
message.setGlobal = (opts) => {
  globalsOptions = { ...opts }
}

message.setContext = (ctx) => {
  _context = ctx
}

export default message
