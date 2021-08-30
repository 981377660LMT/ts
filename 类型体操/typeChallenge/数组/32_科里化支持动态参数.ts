const add = (a: number, b: number) => a + b

const curriedAdd = DynamicParamsCurrying(add)
const five = curriedAdd(2)(3)
// 请实现
const five2 = curriedAdd(2, 3)

function DynamicParamsCurrying<T>(this: T, func: (...args: any[]) => any) {
  const ctx = this
  return function inner(...args: any[]): any {
    // 传的满了,call
    if (args.length === func.length) return func.call(ctx, ...args)
    // 传的没有满,bind
    return inner.bind(ctx, ...args)
  }
}

console.log(five)
// export {}
