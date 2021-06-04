interface IteratorInterface {
  next: () => {
    value: any
    done: boolean
  }
}

function createIterator(array: any[]): IteratorInterface {
  let index = 0
  let len = array.length

  return {
    next: function () {
      return index < len ? { value: array[index++], done: false } : { value: undefined, done: true }
    },
  }
}

var iterator = createIterator([1, 2, 3])

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }

let str: string = 'Hi'
let iterator_: IterableIterator<string> = str[Symbol.iterator]()

console.log(iterator_.next()) // { value: 'i', done: false }
console.log(iterator_.next()) // { value: undefined, done: true }
console.log(iterator_.next()) // { value: 'H', done: false }

// for...of 语句遍历可迭代对象定义要迭代的数据。
// for...in 语句以任意顺序迭代对象的可枚举属性,包括原型链上的。
// 对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法：
// async await 就是基于生成器函数的语法糖，await 可以等待异步函数执行完毕再继续执行后面的代码。
