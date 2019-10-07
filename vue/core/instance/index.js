import { initMixin } from './init'
import { stateMixin } from './state'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'

function Vue(options) {
  this._init(options)
}

// 增加_init方法，构造实例时初始化
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
