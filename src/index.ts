export * from './message'
import { App, Plugin } from 'vue'
import message from './message'
import './style.less'

type WithInstall<T> = T & Plugin
type PluginInstallFunction = (app: App, ...options: any[]) => any;

const withInstall = <T>(t: T, fn: PluginInstallFunction) => {
  ;(t as WithInstall<T>).install = fn
  return t as WithInstall<T>
}

export default withInstall(message, function (app: App, name: string) {
  message.setContext(app._context)
  app.config.globalProperties[name || '$message'] = message
})
