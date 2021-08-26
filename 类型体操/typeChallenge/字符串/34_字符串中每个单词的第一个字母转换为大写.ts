type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'

export {}
type FirstUppercase<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T
type SpiltCode = ' ' | '.' | ','

type Recursion<S extends string> = S extends `${infer M}${infer L}${infer R}`
  ? M extends SpiltCode
    ? `${M}${Uppercase<L>}${Recursion<R>}`
    : `${M}${Recursion<`${L}${R}`>}`
  : S

type CapitalizeWords<T extends string> = Recursion<FirstUppercase<T>>
