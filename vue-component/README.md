# Vue 组件精讲

## 分类

1. 作为路由的页面，不被复用，不对外提供接口

2. 功能独立、不含业务的组件，如日期选择框等，作为UI库

3. 业务组件，可能会被多个页面复用，但只在当前项目中会用到，会包含业务

## 组件三大基础API

属性 prop

插槽 event 

自定义事件 slot

## 组件的通信

### provide/inject

> 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

替代Vuex存储一次性的全局状态

把app.vue实例通过provide注入所有组件，全局状态保存在app.vue中
```js
// app.vue
provide () {
  return {
    app: this
  }
}
```

任何子组件通过this.app.xxx访问根组件所有内容

适用：跨级组件通信，子组件获取上级组件的状态


### 派发与广播  实现dispatch/broadcast

模拟1.x版本的$dispatch 和 $broadcast

> 在 Vue.js 1.x 中，提供了两个方法：$dispatch 和 $broadcast ，前者用于向上级派发事件，只要是它的父级（一级或多级以上），都可以在组件内通过 $on （或 events，2.x 已废弃）监听到，后者相反，是由上级向下级广播事件的。

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
};
```

### 找到任意组件实例

向上找到最近的指定组件

向上找到所有的指定组件

向下找到最近的指定组件

向下找到所有指定的组件

找到指定组件的兄弟组件

原理：通过递归、遍历，找到指定组件的name匹配的组件实例并返回
