const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
// const curriedAdd: (x: number) => (x: number) => number
const five = curriedAdd(2)(3)

// 每次取出参数数组最后一个参数，从右往左
type Curr<A extends any[], R> = A extends [...infer F, infer L] ? Curr<F, (x: L) => R> : R
declare function Currying<T>(func: T): T extends (...args: infer A) => infer R ? Curr<A, R> : never

// 优先推断后面的非解构部分
type Test1 = [1] extends [...infer Location, infer R] ? R : false
type Test2 = [0] extends [...infer Location, infer R] ? true : false

export {}
