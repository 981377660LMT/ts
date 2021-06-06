// 迭代器模式 (Iterator Pattern)
// 定义: 提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。

// 实际上 jQuery 就已经实现了迭代器 $.each
// $.each([1,2,3], function(index, value) {
//     console.log(index, value)
// })
interface Iterator<T> {
  hasNext(): boolean
  next(): T
}

class ArrayIterator implements Iterator<any> {
  private arr: Array<any>
  private index: number
  constructor(arr: Array<any>) {
    this.arr = arr
    this.index = 0
  }
  hasNext() {
    if (this.index < this.arr.length) {
      return true
    }
    this.index = 0
    return false
  }
  next() {
    return this.arr[this.index++]
  }
  getIndex() {
    return this.index
  }
}

let arr1 = [1, 2, 3, 4, 5]

let arrayIterator = new ArrayIterator(arr1)

while (arrayIterator.hasNext()) {
  console.log(arrayIterator.next())
}

// 最后模拟实现 jQuery 的 each 方法
const arr2 = [1, 2, 3]
const $ = {
  each(arr: Array<any>, callback: Function) {
    let arrayIterator = new ArrayIterator(arr)
    while (arrayIterator.hasNext()) {
      callback(arrayIterator.getIndex(), arrayIterator.next())
    }
  },
}

$.each(arr2, function (index: number, value: any) {
  console.log(index, value)
})
