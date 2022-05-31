// 这个 P extends any 和 P extends P 是一样的，都是为了触发联合类型的分发特性
// string extends keyof P 是为了排除 any 和 never
type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
        Partial<Pick<P, Extract<keyof P, keyof D>>> &
        Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never

let fooo: Defaultize<{ a: string; b: string }, { a: number }> = {
  b: '2',
}

type GetRefProps<Props> = '1' extends keyof Props ? Props['1'] : never
let dsa: GetRefProps<[0, 2]>

type GetRefProps2<Props> = '1' extends keyof Props
  ? Props extends { 1: infer Value }
    ? Value
    : never
  : never

let dsa2: GetRefProps2<[0, 2]>
