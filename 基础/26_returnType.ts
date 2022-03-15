// ReturnType<T> – 获取函数返回值类型。
const add = <T>(x: number, y: number) => x + y
type t = ReturnType<typeof add> // type t = number
// infer 的作用是让 TypeScript 自己推断，并将推断的结果存储到一个类型变量中，
// infer 只能用于 extends 语句中。
// ReturnType 的实现：如果 T 满足约束条件 (...args: any) => any，
// 并且能够赋值给 (...args: any) => infer R，则返回类型为 R，否则为 any 类型。
type T0 = ReturnType<() => string> // string
type T1 = ReturnType<(s: string) => void> // void
type T2 = ReturnType<<T>() => T> // unknown
// 借助 infer 实现元组转联合类型
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T
type T3 = Flatten<[string, [number]]>
