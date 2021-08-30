const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
// const curriedAdd: (x: number) => (x: number) => number
const five = curriedAdd(2)(3)

// 每次取出参数数组最后一个参数，从右往左
// 这种柯里化只支持展开全部参数
type Curr<Remain extends any[], Path> = Remain extends [...infer L, infer R]
  ? Curr<L, (x: R) => Path>
  : Path
declare function Currying<T>(func: T): T extends (...args: infer A) => infer R ? Curr<A, R> : never

// 优先推断后面的非解构部分
type Test1 = [1] extends [...infer Location, infer R] ? R : false
type Test2 = [0] extends [...infer Location, infer R] ? true : false

export {}
