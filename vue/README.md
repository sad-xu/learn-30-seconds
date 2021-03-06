# learn vue

### 源码文件结构

```sh
├── scripts ------------------------------- 构建相关的文件，一般情况下我们不需要动
│   ├── git-hooks ------------------------- 存放git钩子的目录
│   ├── alias.js -------------------------- 别名配置
│   ├── config.js ------------------------- 生成rollup配置的文件
│   ├── build.js -------------------------- 对 config.js 中所有的rollup配置进行构建
│   ├── ci.sh ----------------------------- 持续集成运行的脚本
│   ├── release.sh ------------------------ 用于自动发布新版本的脚本
├── dist ---------------------------------- 构建后文件的输出目录
├── examples ------------------------------ 存放一些使用Vue开发的应用案例
├── flow ---------------------------------- 类型声明，使用开源项目 [Flow](https://flowtype.org/)
├── packages ------------------------------ 存放独立发布的包的目录
├── test ---------------------------------- 包含所有测试文件
├── src ----------------------------------- 这个是我们最应该关注的目录，包含了源码
│   ├── compiler -------------------------- 编译器代码的存放目录，将 template 编译为 render 函数
│   ├── core ------------------------------ 存放通用的，与平台无关的代码
│   │   ├── observer ---------------------- 响应系统，包含数据观测的核心代码
│   │   ├── vdom -------------------------- 包含虚拟DOM创建(creation)和打补丁(patching)的代码
│   │   ├── instance ---------------------- 包含Vue构造函数设计相关的代码
│   │   ├── global-api -------------------- 包含给Vue构造函数挂载全局方法(静态方法)或属性的代码
│   │   ├── components -------------------- 包含抽象出来的通用组件
│   ├── server ---------------------------- 包含服务端渲染(server-side rendering)的相关代码
│   ├── platforms ------------------------- 包含平台特有的相关代码，不同平台的不同构建的入口文件也在这里
│   │   ├── web --------------------------- web平台
│   │   │   ├── entry-runtime.js ---------- 运行时构建的入口，不包含模板(template)到render函数的编译器，所以不支持 `template` 选项，我们使用vue默认导出的就是这个运行时的版本。大家使用的时候要注意
│   │   │   ├── entry-runtime-with-compiler.js -- 独立构建版本的入口，它在 entry-runtime 的基础上添加了模板(template)到render函数的编译器
│   │   │   ├── entry-compiler.js --------- vue-template-compiler 包的入口文件
│   │   │   ├── entry-server-renderer.js -- vue-server-renderer 包的入口文件
│   │   │   ├── entry-server-basic-renderer.js -- 输出 packages/vue-server-renderer/basic.js 文件
│   │   ├── weex -------------------------- 混合应用
│   ├── sfc ------------------------------- 包含单文件组件(.vue文件)的解析逻辑，用于vue-template-compiler包
│   ├── shared ---------------------------- 包含整个代码库通用的代码
├── package.json -------------------------- 
├── yarn.lock ----------------------------- yarn 锁定文件
├── .editorconfig ------------------------- 针对编辑器的编码风格配置文件
├── .flowconfig --------------------------- flow 的配置文件
├── .babelrc ------------------------------ babel 配置文件
├── .eslintrc ----------------------------- eslint 配置文件
├── .eslintignore ------------------------- eslint 忽略配置
├── .gitignore ---------------------------- git 忽略配置
```

### 初始化流程

```
npm run dev
scripts/config.js + web-full-dev
src/platforms/web/entry-runtimw-with-compiler.js
src/platforms/web/runtime/index.js -- 平台化包装
src/core/index.js -- 添加静态属性方法
src/core/instance/index.js -- 定义构造函数,添加原型属性方法
```

### 构造函数和原型

```js
function Vue(options) {
  this._init(options)
}

// initMixin src/core/instance/init.js
Vue.prototype._init = function(options) {}

// stateMixin src/core/instance/state.js
Vue.prototype.$data
Vue.prototype.$props
Vue.prototype.$set
Vue.prototype.$delete
Vue.prototype.$watch = function(expOrFn, cb, options) {}

// eventsMixin src/core/instance/events.js
Vue.prototype.$on = function(event, fn) {}
Vue.prototype.$once = function(event, fn) {}
Vue.prototype.$off = function(event, fn) {}
Vue.prototype.$emit = function(event) {}

// lifecycleMixin src/core/instance/lifecycle.js
Vue.prototype._update = function(vnode, hydrating) {}
Vue.prototype.$forceUpdate = function() {}
Vue.prototype.$destroy = function() {}

// renderMixin src/core/instance/render.js
Vue.prototype._o = markOnce
Vue.prototype._n = toNumber
Vue.prototype._s = toString
Vue.prototype._l = renderList
Vue.prototype._t = renderSlot
Vue.prototype._q = looseEqual
Vue.prototype._i = looseIndexOf
Vue.prototype._m = renderStatic
Vue.prototype._f = resolveFilter
Vue.prototype._k = checkKeyCodes
Vue.prototype._b = bindObjectProps
Vue.prototype._v = createTextVNode
Vue.prototype._e = createEmptyVNode
Vue.prototype._u = resolveScopedSlots
Vue.prototype._g = bindObjectListeners
Vue.prototype.$nextTick = function(fn) {}
Vue.prototype._render = function() {}

// src/core/index.js
Vue.prototype.$isServer
Vue.prototype.$ssrContext

// src/platforms/web/runtime/index.js
Vue.prototype.__patch__
Vue.prototype.$mount = function(el, hydrating) {}

// src/platforms/web/entry-runtimw-with-compiler.js
Vue.prototype.$mount = function(el, hydrating) {}

// src/platforms/web/runtime/index.js
Vue.prototype.__patch__
Vue.prototype.$mount = function(el, hydrating) {}

```

### 静态属性和方法

```js
// initGlobalAPI
Vue.config
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive
}
Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick
Vue.options = {
  components: {
    KeepAlive,
    Transition, // src/platforms/web/runtime/index.js
    TransitionGroup // src/platforms/web/runtime/index.js
  },
  directives: { // src/platforms/web/runtime/index.js
    model,
    show
  },
  filters,
  _base: Vue
}
Vue.use = function(plugin) {}
Vue.mixin = function(mixin) {}
Vue.cid
Vue.extend = function(extendOptions) {}
Vue.component = function(id, definition) {}
Vue.directive = function(id, definition) {}
Vue.filter = function(id, definition) {}
Vue.version
// src/platforms/web/entry-runtime-with-compiler.js
Vue.compile = compileToFunctions
```

### 实例属性

```js
vm._uid
vm._isVue

```