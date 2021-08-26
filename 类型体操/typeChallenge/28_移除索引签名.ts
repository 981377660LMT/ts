type Foo = {
  [key: string]: any
  foo(): void
  a: string
}

type A = RemoveIndexSignature<Foo> // expected { foo(): void }

// 移除 string/number/symbol的键
type RemoveIndexSignature<T extends object> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K]
}
export {}
