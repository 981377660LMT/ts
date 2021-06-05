// Symbols 是不可改变且唯一的。

const sym2 = Symbol('key')
const sym3 = Symbol('key')
// const foo = sym2 === sym3

export {}
///////////////////////////////////
const sym = Symbol()

let obj = {
  [sym]: 'value',
}

console.log(obj[sym]) // "value"
/////////////////////////////
// 众所周知的 Symbols
// instanceof 运算符调用 Symbol.hasInstance
// Array.prototype.concat 调用 Symbol.isConcatSpreadable
// for-of 语句调用 Symbol.iterator
// String.prototype.match 调用 Symbol.match
// String.prototype.replace 调用 Symbol.replace
// 用来创建派生对象时 调用 Symbol.species
// ToPrimitive 抽象操作调用时 调用 Symbol.toPrimitive
// Object.prototype.toString 调用 Symbol.toStringTag
const bar = {
  get [Symbol.toStringTag]() {
    return 'Car'
  },
}

console.log(bar + '')
