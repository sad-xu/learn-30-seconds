class Dep {
  constructor() {
    this.subs = [] // 存放watcher
  }
  // 增加wateher
  addSub(sub) {
    this.subs.push(sub)
  }
  // 触发更新
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null

class Watcher {
  constructor() {
    Dep.target = this
  }
  update() {
    console.log('更新视图')
  }
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
    new Watcher() // Dep.target指向
    console.log('render', this._data.test) // 触发getter
  }
}

// 遍历对象属性
function observer(obj) {
  const dep = new Dep()
  Object.keys(obj).forEach(key => {
    let val = obj[key]
    Object.defineProperty(obj, key, {
      enumerable: true,  // 属性可枚举
      configurable: true, // 属性可被修改或删除
      get: function() {
        dep.addSub(Dep.target)
        return val
      },
      set: function(newV) {
        if (newV === val) return
        dep.notify()
      }
    })
  })
}
