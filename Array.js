
/**
 * all
 * fn全为true时,才返回true
 */
const all = (arr, fn = Boolean) => arr.every(fn)

all([1, 2, 3], x => x > 1)  // true
all([1, 2, 3])              // true  Boolean(1) -> true
all([1, 2, undefined])      // false


/**
 * any
 * 至少有一项为true时,就返回true
 */
const any = (arr, fn = Boolean) => arr.some(fn)

any([0, 0, 0])             // false
any([0, 0, 1], x => x > 0) // true


/**
 * allEqual
 * 判断数组每一项都相等
 */
const allEqual = arr => arr.every(item => item === arr[0])

allEqual([1, 1, 1])  // true
allEqual([1, 1, 2])  // false


/**
 * arrayToCSV
 * 数组 -> csv格式  只适用于二维数组
 */
const arrayToCSV = (arr, sep = ',') => 
  arr.map(item => item.map(val => `"${val}"`).join(sep)).join('\n')

arrayToCSV([[1, 2, 3], [4, 5]]) // "1","2","3"\n"4","5"


/**
 * bitfurcate 
 * 将原数组根据分类数组分类
 * fn = () => (a, b)   // fn() -> b
 */
const bifurcate = (arr, filter) => 
  arr.reduce((acc, item, index) => (acc[filter[index] ? 0 : 1].push(item), acc), [[], []])

bifurcate(['a', 'b', 'c', 'd'], [true, true, false, true])  // [ ['a', 'b', 'd'], ['c'] ]


/**
 * bifurcateBy
 * 根据返回值分组
 */
const bifurcateBy = (arr, fn) => 
  arr.reduce((acc, item, index) => (acc[fn(item) ? 0 : 1].push(item), acc), [[], []])

bifurcateBy(['ab', 'bb', 'cc', 'db'], x => x[1] === 'b')  // [ ['ab', 'bb', 'db'], ['cc'] ]


/**
 * chunk
 * 数组分块
 * Array.from()  // 类数组 -> 数组
 * Array.from(arraylike, () => {...})  <=> Array.from(arraylike).map(() => {...})
 */
const chunk = (arr, size) => 
  Array.from({length: Math.ceil(arr.length / size)}, (item, index) => arr.slice(index * size, index * size + size))

// Array.from({length: Math.ceil(arr.length / size)}).map((item, index) => arr.slice(index * size, index * size + size))

chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]



/**
 * compact
 * Array.prototype.filter(() => {...})  // 过滤 返回新数组 
 * Boolean()  // false null 0 '' NaN  --> false
 * 
 * Boolean(Boolean(false))      // false   typeof Boolean(false)  === 'boolean'
 * Boolean(new Boolean(false))  // true    typeof new Boolean(false) === 'object'
 */
const compact = arr => arr.filter(Boolean)

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]



/**
 * countBy
 * [1,2,3].map(Math.floor)  <==> [1,2,3].map(item => Math.floor(item)) 
 * 
 */

const countBy = (arr, fn) => 
  arr.map(item => typeof fn === 'function' ? fn(item) : item[fn])
    .reduce((acc, item) => (acc[item] = acc[item] ? acc[item] + 1 : 1, acc), {})

countBy([6.1, 4.2, 6.3], Math.floor)        // {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length')  // {3: 2, 5: 1}



/**
 * countOccurrences
 * 指定值的个数
 *
 */
const countOccurrences = (arr, val) => 
  arr.reduce((acc, item) => item === val ? acc + 1 : acc, 0)

countOccurrences([1, 1, 2, 1, 2, 3], 1)     // 3


/**
 * deepFlatten  TODO!
 * 展平数组
 *
 */
00000000000000000000000000000000000000000000000000000000000000000000
const deepFlatten = arr => [].concat(arr.map(item => Array.isArray(item) ? deepFlatten(item) : item))

const deepFlatten2 = arr => {
  return arr.map(item => {
    if (Array.isArray(item)) {

    } else {

    }
  })
}

deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]


/**
 * difference
 * Set()  类数组,成员唯一
 * 
 */
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(item => !s.has(item))
}

difference([1, 2, 3], [1, 2, 4]) // [3]


/**
 * differenceBy
 *
 *
 */
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(item => !s.has(fn(item)))
}

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)          // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)  // [{x: 2}]


/**
 * differenceWith
 * findIndex()  返回第一个符合条件的项的位置
 *
 */
const differenceWith = (a, b, comp) => 
  a.filter(item1 => b.findIndex(item2 => comp(item1, item2)) === -1)

differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)) // [1, 1.2]


/**
 * drop
 * 
 *
 */
const drop = (arr, n = 1) => arr.slice(n)

drop([1, 2, 3])      // [2,3]
drop([1, 2, 3], 2)   // [3]
drop([1, 2, 3], 42)  // []


/**
 * dropRight
 * 
 *
 */
const dropRight = (arr, n = 1) => arr.alice(0, -n)

dropRight([1, 2, 3])      // [1,2]
dropRight([1, 2, 3], 2)   // [1]
dropRight([1, 2, 3], 42)  // []


/**
 * dropRightWhile
 * 从数组末端开始,返回符合条件的项
 *
 */
const dropRightWhile = (arr, fn) => {
  while(arr.length && !fn(arr[arr.length - 1])) arr = arr.slice(0, -1)  // 去除不符合条件的项
  return arr
}

dropRightWhile([1, 2, 3, 4], n => n < 3)   // [1, 2]


/**
 * dropWhile
 * 
 *
 */
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr
}

const dropWhile2 = (arr, fn) => 
  arr.reduce((acc, item) => {
    if (fn(item)) acc.push(item)
    return acc
  }, [])

dropWhile([1, 2, 3, 4], n => n >= 3)  // [3,4]


/**
 * everyNth
 * 每隔n个
 */
const everyNth = (arr, n) => arr.filter((item, index) => (index + 1) % n === 0)

everyNth([1, 2, 3, 4, 5, 6], 2) // [ 2, 4, 6 ]


/**
 * filterFalsy
 * 过滤掉数组中的虚假值
 *
 */
const filterFalsy = arr => arr.filter(item => Boolean(item))  // arr.filter(Boolean)

filterFalsy(['', true, {}, false, 'sample', 1, 0]) // [true, {}, 'sample', 1]


/**
 * filterNonUnique
 * 过滤掉数组里的非唯一值
 * 首次出现的次序 === 最后出现的次序 -> 唯一值
 */
const filterNonUnique = arr => arr.filter(item => arr.indexOf(item) === arr.lastIndexOf(item))

filterNonUnique([1, 2, 2, 3, 4, 4, 5]) // [1, 3, 5]


/**
 * filterNonUniqueBy
 * 指定筛选规则，选出唯一值
 * 
 */
const filterNonUniqueBy = (arr, fn) => 
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x)))

filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
) // [ { id: 2, value: 'c' } ]


/**
 * findLast
 * 返回满足条件的最后一个元素
 *
 */
const findLast = (arr, fn) => arr.filter(fn).pop()

findLast([1, 2, 3, 4], n => n % 2 === 1) // 3


/**
 * findLastIndex 
 * 返回满足条件的最后一个元素的index
 * 先将index整合到value中,再筛选
 */
const findLastIndex = (arr, fn) => 
  arr.map((item, index) => [item, index])
    .filter(item => fn(item[0]))
    .pop()[1]

findLastIndex([1, 2, 3, 4], n => n % 2 === 1) // 2 (index of the value 3)


/**
 * flatten
 * 展平数组到指定深度
 *
 */
const flatten = (arr, depth = 1) => 
  arr.reduce((arr, item) => arr.concat(depth > 1 && item instanceof Array ? flatten(item, depth - 1) : item), [])

flatten([1, [2], 3, 4]) // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2) // [1, 2, 3, [4, 5], 6, 7, 8]


/**
 * forEachRight
 * 从后往前执行给定函数
 * 
 */
const forEachRight = (arr, fn) => arr.reverse().forEach(fn)

forEachRight([1, 2, 3, 4], val => console.log(val)) // '4', '3', '2', '1'


/**
 * groupBy
 * 根据给定函数对数组分组
 *
 */
const groupBy = (arr, fn) => 
  arr.reduce((acc, item) => {
    let val = typeof fn === 'function' ? fn(item) : item[fn]
    acc[val] = (acc[val] || []).concat(item)
    return acc
  }, {})

groupBy([6.1, 4.2, 6.3], Math.floor) // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length') // {3: ['one', 'two'], 5: ['three']}


/**
 * head
 * 返回第一个元素
 */
const head = arr => arr[0]

head([1, 2, 3]) // 1


/**
 * indexOfAll
 * 返回匹配值的次序
 */
const indexOfAll = (arr, val) => 
  arr.reduce((acc, item, index) => {
    if (item === val) acc.push(index)
    return acc
  }, [])

indexOfAll([1, 2, 3, 1, 2, 3], 1) // [0,3]
indexOfAll([1, 2, 3], 4) // []

/**
 * initial
 * 剔除数组最后一项
 *
 */
const initial = arr => arr.slice(0, -1)

initial([1, 2, 3]) // [1,2]


/**
 * initialize2DArray
 * 生成指定二维数组
 *
 */
const initialize2DArray = (row, col, val = null) => 
  Array.from({length: row}).map(() => Array.from({length: col}).fill(val))

initialize2DArray(2, 2, 0) // [[0,0], [0,0]]


/**
 * initializeArrayWithRange
 * 返回一个指定开始、结束、步长的数组
 *
 */
const initializeArrayWithRange = (end, start = 0, step = 1) => 
  Array.from({length: Math.ceil((end - start + 1) / step)}, (item, index) => start + index * step)

initializeArrayWithRange(5) // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3) // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2) // [0,2,4,6,8]


/**
 * initializeArrayWithRangeRight
 * 同上，反向
 *
 */
const initializeArrayWithRangeRight = (end, start = 0, step = 1) => 
  Array.from({ length: (end - start + 1) / step}).map((item, index, arr) => start + (arr.length - index + 1) * step)

initializeArrayWithRangeRight(5) // [5,4,3,2,1,0]
initializeArrayWithRangeRight(7, 3) // [7,6,5,4,3]
initializeArrayWithRangeRight(9, 0, 2) // [8,6,4,2,0]


/**
 * initializeArrayWithValues
 * 返回用指定值填充的指定长度的数组
 *
 */
const initializeArrayWithValues = (num, val = 0) => Array.from({ length: num }).fill(val)

initializeArrayWithValues(5, 2) // [2, 2, 2, 2, 2]


/**
 * initializeNDArray
 * 返回用指定值填充的指定维度的数组
 *
 */
const initializeNDArray = (val, ...args) => 
  args.length === 0 
    ? val 
    : Array.from({ length: args[0] }).map(() => initializeNDArray(val, ...args.slice(1)))

initializeNDArray(1, 3) // [1,1,1]
initializeNDArray(5, 2, 2, 2) // [[[5,5],[5,5]],[[5,5],[5,5]]]


/**
 * intersection
 * 提取交集
 *
 */
const intersection = (a, b) => a.filter(v => b.indexOf(v) >= 0)

intersection([1, 2, 3], [4, 3, 2]) // [2, 3]


/**
 * intersectionBy
 * 根据指定函数的返回值提取交集
 *
 */
const intersectionBy = (a, b, fn) => {
  b = b.map(item => fn(item))
  return a.filter(v => b.indexOf(fn(v)) >= 0)
} 

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [2.1]


/**
 * intersectionWith
 * 根据指比较器返回存在的元素列表
 *
 */
const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1)

intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)) // [1.5, 3, 0]


/**
 * isSorted
 * 升序返回  1
 * 降序返回 -1
 * 乱序返回  0
 */
const isSorted = arr => {
  let d = 0 // 初始默认乱序
  for (let i = 1; i < arr.length; i++) {
    let flag = arr[i - 1] - arr[i]
    if (flag === 0) continue // 相等值跳过
    if (d === 0) { // 首次出现升序或降序
      d = flag
    } else if (d * flag < 0) { // 一旦出现异序，即返回
      return 0
    }
  }
  if (d > 0) return -1
  else if (d < 0) return 1
  else return 0
}

isSorted([0, 1, 2, 2]) // 1
isSorted([4, 3, 2]) // -1
isSorted([4, 3, 5]) // 0


/**
 * join
 * 根据指定分隔符和最后分隔符
 * 数组 -> 字符串
 */
const join = (arr, sep = ',', end = sep) => 
  arr.reduce((acc, item, index) => {
    if (index === 0) {
      acc += item
    } else if (index === arr.length - 1) {
      acc += end + item
    } else {
      acc += sep + item
    }
    return acc
  }, '')

join(['pen', 'pineapple', 'apple', 'pen'], ',', '&') // "pen,pineapple,apple&pen"
join(['pen', 'pineapple', 'apple', 'pen'], ',') // "pen,pineapple,apple,pen"
join(['pen', 'pineapple', 'apple', 'pen']) // "pen,pineapple,apple,pen"


/**
 * JSONtoCSV
 * JSON转CSV
 * 指定列项，指定分隔符
 */
const JSONtoCSV = (arr, col, sep = ',') => {
  let ret = [col]
  arr.map(obj => {
    let m = []
    col.forEach(val => {
      m.push(obj[val] ? `"${obj[val]}"` : '""')
    })
    ret.push(m)
  })
  return ret.reduce((acc, item, index) => 
    acc += item.join(sep) + (index === ret.length - 1 ? '' : '\n'), 
    ''
  )
}

const JSONtoCSV = (arr, col, sep = ',') =>
  [
    col.join(sep),
    ...arr.map(obj =>
      col.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : sep}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n')

JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']) 
// 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';') 
// 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'


/**
 * last
 * 返回数组最后一项
 */
const last = arr => arr[arr.length - 1]

last([1, 2, 3]) // 3


/**
 * longestItem
 * 返回最长的一项
 */
const longestItem = (...vals) => 
  vals.reduce((acc, item) => (acc.length > item.length ? acc : item))

longestItem('this', 'is', 'a', 'testcase') // 'testcase'
longestItem(...['a', 'ab', 'abc']) // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd') // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]) // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar') // 'foobar'


/**
 * mapObject 
 * 数组映射到对象
 */
const mapObject = (arr, fn) =>
  arr.reduce((acc, item) => (acc[item] = fn(item), acc),{})

// 官方答案 不是很懂
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))()

const squareIt = arr => mapObject(arr, a => a * a)
squareIt([1, 2, 3]) // { 1: 1, 2: 4, 3: 9 }

