type A = string extends Object ? 'yes' : 'no'
type B = string extends {} ? 'yes' : 'no'
type C = string extends object ? 'yes' : 'no'

type D = {} extends Object ? 'yes' : 'no'
type E = Object extends {} ? 'yes' : 'no'
// Object和{}是一样
// 该类型是所有 Object 类的实例的类型。它由以下两个接口来定义：
// Object 接口定义了 Object.prototype 原型对象上的属性；
// ObjectConstructor 接口定义了 Object 类的属性。
interface Object {
  constructor: Function
  toString(): string
  toLocaleString(): string
  valueOf(): Object
  hasOwnProperty(v: PropertyKey): boolean
  isPrototypeOf(v: Object): boolean
  propertyIsEnumerable(v: PropertyKey): boolean
}

interface ObjectConstructor {
  /** Invocation via `new` */
  new (value?: any): Object
  /** Invocation via function calls */
  (value?: any): any

  readonly prototype: Object

  getPrototypeOf(o: any): any

  // ···
}

declare var Object: ObjectConstructor

// object表示非基础类型

// 用处:
// 1.object限制非基础类型
// 2.Object/{}限制类型不为null/undefined
// const fff1: Object = null
// const fff2: {} = undefined
// const fff3: object = 1
