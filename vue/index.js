
function Vue(options) {
  this._init(options)
}


let uid = 0
Vue.prototype._init = function(options) {
  const vm = this
  vm._uid = uid++
  vm._isVue = true
  vm.$options = mergeOptions(
    vm.constructor.options,
    options,
    vm
  )
}