type A = 1 & never
type B = 1 | never
type C = 1 & unknown
export {}
type MyOmit<T, K extends keyof T> = {
  [key in keyof T as key extends K ? never : key]: T[key]
}

type Foo = {
  a: string
  b: number
  c: boolean
}

type asB = MyOmit<Foo, 'c'>
