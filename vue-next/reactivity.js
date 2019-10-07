// { obj: proxy }
const rawToReactive = new WeakMap()
// { proxy: obj }
const reactiveToRaw = new WeakMap()

// const collectionTypes = new Set([Set, Map, WeakMap, WeakSet])

// { target: { key: Dep } }
const targetMap = new WeakMap()

const mutableHandlers = {
  get: function(target, key, receiver) {
    let res = target[key]
    track(target, 'get', key)
    return isObject(res)
      ? reactive(res)
      : res
  },
  set: function(target, key, value, receiver){
    value = reactiveToRaw.get(value) || value 
    const oldValue = target[key]
    // 是否是新key
    const hadKey = Object.prototype.hasOwnProperty.call(target, key)
    // 赋值
    target[key] = value
    if (!hadKey) {
      trigger(target, 'add', key)
    } else if (value !== oldValue) {
      trigger(target, 'set', key)
    }
    // 数组某些操作会触发多次get,set 必须有返回值
    return true 
  }
  // deleteProperty,
  // has,
  // ownKeys
}


function isObject(val) {
  return val !== null && typeof val === 'object'
}

// effect 
const activeReactiveEffectStack = []
function track(target, type, key) {
  const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    if (depsMap === undefined) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Set()
      depsMap.set(key, dep)
    }
    if (!dep.has(effect)) {
      dep.add(effect)
      effect.deps.push(dep)
    }
  }
}

function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if (depsMap === undefined) return
  const effects = new Set()
  addRunners(effects, depsMap.get(key))
  if (type === 'add') {
    const iterationKey = Array.isArray(target) ? 'length' : 'iterate'
    addRunners(effects, depsMap.get(iterationKey))
  }
  effects.forEach(effect => effect())
}

function addRunners(effects, effectsToAdd) {
  if (effectsToAdd !== undefined) {
    effectsToAdd.forEach(effect => {
      effects.add(effect)
    })
  }
}

function reactive(target) {
  return createReactiveObject(
    target,
    rawToReactive,
    reactiveToRaw,
    mutableHandlers,
    // mutableCollectionHandlers
  )
}

function createReactiveObject(
  target, 
  rawToReactive, 
  reactiveToRaw, 
  baseHandlers,
  // collectionHandlers
) {
  // 支持Object,Array,Map,Set,WeakMap,WeakSet
  if (!isObject(target)) {
    return target
  }
  // 对象已有代理
  let observed = rawToReactive.get(target)
  if (observed !== undefined) {
    return observed
  }
  // 目标已经是代理
  if (reactiveToRaw.has(target)) {
    return target
  }
  // 根据对象的构造函数得出handlers
  // Set,Map,WeakMap,WeakSet和其他数据类型处理方式不一样
  // const handlers = collectionTypes.has(target.constructor)
  //   ? collectionHandlers
  //   : baseHandlers
  const handlers = baseHandlers
  observed = new Proxy(target, handlers)
  rawToReactive.set(target, observed)
  reactiveToRaw.set(observed, target)
  if (!targetMap.has(target)) {
    targetMap.set(target, new Map())
  }
  return observed
}

function effect(fn) {
  if (fn.isEffect) {
    fn = fn.raw
  }
  const effect = function(...args) {
    if (activeReactiveEffectStack.indexOf(effect) === -1) {
      // cleanup
      const deps = effect.deps
      if (deps.length) {
        for (let i = 0; i < deps.lenth; i++) {
          deps[i].delete(effect)
        }
        deps.length = 0
      }
      // 
      try {
        activeReactiveEffectStack.push(effect)
        return fn(...args)
      } finally {
        activeReactiveEffectStack.pop()
      }
    }
  }
  effect.isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect()
}



const value = reactive({ num: 0 })
effect(() => {
  // console.log('effect', value.num)
  value.num++
  console.log(value.num)
})

value.num = 9

