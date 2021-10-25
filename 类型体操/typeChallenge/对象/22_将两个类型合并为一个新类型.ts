type KV<T> = { [K in keyof T]: T[K] }
type Merge<F, S> = Omit<F, keyof S> & S

type Test = KV<Merge<Foo, Bar>>
type Foo = {
  a: number
  b: string
}

type Bar = {
  b: number
}
export {}
