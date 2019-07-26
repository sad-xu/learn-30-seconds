# 基础知识

## 基本类型 引用类型

6种基本类型

`boolean`, `null`, `number`, `string`, `undefined`, `symbol`

`typeof null === 'object'` 

原因：二进制位存储变量类型信息，`000`开头代表对象，`null`为全0，错误判断为对象

基本类型存的是值；引用类型存的是指针

```js
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }
  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?

// 对象类型传参，传的是形参
function test2(p) {
  p = 1
  return p
}
let a = { v: 2}
test2(a) // 1 a不变
```

---

## `typeof` 与 `instanceof`

`typeof`

对于基本类型：除了`null`都可以显示正确类型
对于引用类型：除了函数都是显示`object`

```js
typeof 1            // 'number'
typeof '1'          // 'string'
typeof undefined    // 'undefined'
typeof true         // 'boolean'
typeof Symbol()     // 'symbol'
typeof []           // 'object'
typeof {}           // 'object'
typeof console.log  // 'function'
```

`instabceof`

判断引用类型

---

## 类型转换

三种情况

1. 转换为布尔值
2. 转换为数字
3. 转换为字符串

加法运算符

* 其中一方为字符串，会把另一方也转为字符串
* 始终会转化为数字或字符串

```js
1 + '1'     // '11'
true + true // 2
4 + [1,2,3] // 4 + '1,2,3' --> "41,2,3"
'a' + + 'b' // 'a' + 'NaN' --> "aNaN"
```

## `this`

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // window

// 等同于 this永远由第一次bind决定
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```