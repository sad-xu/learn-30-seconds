import { initLifecycle, callHook } from './lifecycle'
import { initEvents } from './events'
import { initRender } from './render'
import { initProvide, initInjections } from './inject'
import { initState } from './state'

let uid = 0

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    // const vm = this
    vm._uid = uid++
    // 防止自身被观察的标志位
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // initInternalComponent(vm, options)
    } else {
      // vm.$options = mergeOptions(
      //   resolveConstructorOptions(vm.constructor),
      //   options || {},
      //   vm
      // )
    }

    vm._renderProxy = vm
    vm._self = vm
    
    // 初始化生命周期
    initLifecycle(vm)
    // 初始化事件
    initEvents(vm)
    // 初始化render
    initRender(vm)
    // 调用beforeCreate钩子函数并且触发beforeCreate钩子事件
    callHook(vm, 'beforeCreate')
    // resolve injections before data/props
    initInjections(vm) 
    // 初始化props、methods、data、computed与watch
    initState(vm)
    // resolve provide after data/props
    initProvide(vm) 
    // 调用created钩子函数并且触发created钩子事件
    callHook(vm, 'created')

    if (vm.$options.el) { // 挂载组件
      vm.$mount(vm.$options.el)
    }
  }
}