// 将非函数属性去掉
// Omit 值为非函数的 key
type PickFunctionKeys<V> = {
  [K in keyof V]: V[K] extends Function ? K : never
}[keyof V]
type PickFunction<I> = Pick<I, PickFunctionKeys<I>>

interface NotPureFunction {
  impurity: string
  fun(foo: string): void
  prom(action: Promise<string>): Promise<number>
}

type Keys = PickFunctionKeys<NotPureFunction>
type Funcs = PickFunction<NotPureFunction>
///////////////////////////////////////////////////////
// 提取Promise中的泛型类型 extends + infer 提取
type ExtractPromise<P> = {
  [K in PickFunctionKeys<P>]: P[K] extends (arg: Promise<infer T>) => Promise<infer U>
    ? (arg: T) => U
    : never
}
type P = ExtractPromise<NotPureFunction>

export {}
