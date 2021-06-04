// is 关键字，它被称为类型谓词，用来判断一个变量属于某个接口或类型
// 用来强制限制函数的变量类型（相当于as的函数返回值类型版）
function isString_(s: unknown): s is string {
  return typeof s === 'string'
}

function toUpperCase(x: unknown) {
  if (isString_(x)) {
    x.toUpperCase() // Error, Object is of type 'unknown'
  }
}

const isNumber = (val: unknown): val is number => typeof val === 'number'
const isString = (val: unknown): val is string => typeof val === 'string'
const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
const isFunction = (val: unknown): val is Function => typeof val === 'function'
const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'
function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)
const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'
