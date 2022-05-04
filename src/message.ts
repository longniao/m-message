import MessageComponent from './message.vue'
import { createVNode, render, isVNode, VNode } from 'vue'
import type { AppContext } from 'vue'

type ContentType = string | VNode | (() => VNode)
export interface MessageOptions {
  type?: string
  title?: string
  content?: ContentType
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
  onCollapsed?: (collapsed: boolean) => void
  ctx?: AppContext
}

type MessageTypeOptions = Omit<MessageOptions, 'type'>
export interface MessageIntance {
  id: string
  close: () => void
}

export type MessageFn = (message: ContentType, options?: MessageTypeOptions) => MessageIntance
export interface Message {
  (options: MessageOptions): MessageIntance
  info: MessageFn
  success: MessageFn
  error: MessageFn
  warning: MessageFn
  loading: MessageFn
  closeAll: () => void
  setDefault: (options: MessageTypeOptions) => void
  _context?: AppContext | null
}

const instances: { id: string, close: () => void }[] = []
let seed = 0
const containers: {[key: string]: HTMLElement} = {}
let globalsOptions: MessageOptions = {}

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
  let children = null
  if (isVNode(options.content)) {
    children = { default: () => options.content }
    props.content = ''
  } else if (typeof options.content === 'function') {
    children = { default: options.content }
    props.content = ''
  }

  const vm = createVNode(MessageComponent, props, children)
  const div = document.createElement('div')

  vm.appContext = options.ctx || message._context || null
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

message.success = (content: ContentType, options?: MessageTypeOptions) => message({ ...options, type: 'success', content })
message.info = (content: ContentType, options?: MessageTypeOptions) => message({ ...options, type: 'info', content })
message.warning = (content: ContentType, options?: MessageTypeOptions) => message({ ...options, type: 'warning', content })
message.error = (content: ContentType, options?: MessageTypeOptions) => message({ ...options, type: 'error', content })
message.loading = (content: ContentType, options?: MessageTypeOptions) => message({ ...options, type: 'loading', content })

message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

// global options
message.setDefault = (opts) => {
  globalsOptions = { ...opts }
}

export default message
