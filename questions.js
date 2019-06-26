
/**
 * 声明提升 
 * 暂时性死区
 * 
 * undefined ReferenceError
 */
function sayHi() {
  console.log(a)
  console.log(b)
  var a = 'a'
  let b = 'b'
}

/**
 * 块级作用域
 * 3 3 3
 * 0 1 2
 */
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

/**
 * 箭头函数 this指向
 * 20 NaN
 */
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()


/**
 * 隐式转换
 * 1 false
 */
+true
!'Lydia'


/**
 * 对象访问方式
 * TypeError true true
 */
const bird = {
  size: 'small'
}
const mouse = {
  name: 'Mickey',
  small: true
}
mouse.bird.size
mouse[bird.size]
mouse[bird['size']]


/**
 * 对象引用
 * Hello
 */
let c = { greeting: 'Hey!' }
let d

d = c
c.greeting = 'Hello'
console.log(d.greeting)


/**
 * new 全等
 * true false false
 */
let a = 3
let b = new Number(3)
let c = 3

console.log(a == b)
console.log(a === b)
console.log(b === c)


/**
 * 扩展运算符
 * 'object'
 */
function getAge(...args) {
  console.log(typeof args)
}
getAge(22)


/**
 * 对象的key始终会转为字符串
 */
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }
a[b] = 123
a[c] = 456
console.log(a[b])



/**
 * setTimeout 
 * First Third Second
 */
const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'))
const baz = () => console.log('Third')

bar()
foo()
baz()

