

export function initEvents (vm: Component) {
  // 在vm上创建一个_events对象，用来存放事件
  vm._events = Object.create(null)
  // 表明是否存在钩子，而不需要通过哈希表的方法来查找是否有钩子，减少不必要的开销，优化性能
  vm._hasHookEvent = false
  // 初始化父组件attach的事件
  // const listeners = vm.$options._parentListeners
  // if (listeners) {
  //   updateComponentListeners(vm, listeners)
  // }
}