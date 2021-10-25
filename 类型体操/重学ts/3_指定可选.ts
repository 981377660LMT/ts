type Foo = {
  a: number
  b?: string
  c: boolean
}
type Map<N> = {
  [K in keyof N]: N[K]
}

type SetOptional<O extends object, T extends keyof O> = Map<Partial<Pick<O, T>> & Omit<O, T>>
// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>

export {}

interface Example {
  a: string
  b: string | number
  c: () => void
  d: {}
}
// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>
type ConditionalPick<O extends object, T> = {
  [K in keyof O as O[K] extends T ? K : never]: O[K]
}
