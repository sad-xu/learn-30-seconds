
// 防抖
function debounce(fn, wait = 300) {
  let timeId
  return function(...args) {
    if (timeId) clearTimeout(timeId)
    timeId = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}


// 节流
function throttle(fn, wait = 300) {
  let lastTime = +new Date()
  return function(...args) {
    let now = +new Date()
    if (now - lastTime > wait) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

function throttle2(fn, wait = 300) {
  let timeId
  return function(...args) {
    if (!timeId) {
      timeId = setTimeout(() => {
        timeId = null
        fn.apply(this, args)
      }, wait)
    }
  }
}

// Prmoise.all
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let index = 0
    let arr = []
    if (promises.length === 0) return resolve(arr)
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        arr[i] = res
        if (++index === promises.length) {
          return resolve(arr)
        }
      }).catch(err => {
        return reject(err)
      })
    }
  })
}

// Promise.finally
Promise.prototype.myFinally(cb) {
  return this.then(
    res => Promise.resolve(cb()).then(() => res),
    err => Promise.resolve(cb()).then(() => { throw err })
  )
}

// Promise.race
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(res => resolve(res))
        .catch(err => reject(err))
    }
  })
}

// call
Function.prototype.call = function(context, ...args) {
  if (!context) context = window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

// apply
Function.prototype.apply = function(context, args) {
  if (!context) context = window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

// router
class Routers {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }
  route(path, cb) {
    this.routes[path] = cb
  }
  refresh() {
    this.currentUrl = location.hash.slice(1)
    this.routes[this.currentUrl]()
  }
}


// 双向绑定
class Dep { // 发布订阅中心
  constructor() {
    this.subs = new Map()
  }
  addSub(key, sub) {
    const currentSub = this.subs[key]
    if (currentSub) currentSub.add(sub)
    else this.subs.set(key, new Set([sub]))
  }
  notify(key) {
    let currentSub = this.subs.get(key)
    if (currentSub) {
      currentSub.forEach(sub => sub.update())
    }
  }
}

const Observer = obj => {
  const dep = new Dep()
  return new Proxy(obj, {
    get: function(target, key, receiver) {
      if (Dep.target) dep.addSub(key, Dep.target)
    },
    set: function(target, key, value, receiver) {
      if (target[key] === value) return
      target[key] = value
      dep.notify(key)
    }
  })
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }
  get() {

  }
}
