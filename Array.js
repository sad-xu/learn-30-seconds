
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



