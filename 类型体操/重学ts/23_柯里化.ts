type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = CurryHelper<P, R>

type CurryHelper<Arg extends any[], Return extends any> = Arg extends [infer A, ...infer B]
  ? <K extends PickParameters<B>>(arg: A, ...args: K) => CurryHelper<RemoveHead<B, K>, Return>
  : Return // 你的实现代码

type PickParameters<P extends any[]> = P extends [infer A, ...infer B]
  ? [A, ...PickParameters<B>] | []
  : []
type RemoveHead<Raw extends any[], Remove extends any[]> = Remove extends [infer _, ...infer Rest1]
  ? Raw extends [infer _, ...infer Rest2]
    ? RemoveHead<Rest2, Rest1>
    : never
  : Raw

type F0 = Curry<() => Date> //  Date
type F1 = Curry<(a: number) => Date> // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date> //  (arg_0: number) => (b: string) => Date

export {}
