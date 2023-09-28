// 可串联构造器

// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

declare const a: Chainable

const result1 = a.option('foo', 123).option('bar', { value: 'Hello World' }).option('name', 'type-challenges').get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [Expect<Alike<typeof result1, Expected1>>, Expect<Alike<typeof result2, Expected2>>, Expect<Alike<typeof result3, Expected3>>]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

// ============= Your Code Here =============
// https://github.com/type-challenges/type-challenges/issues/13951

// 1. 递归传递 T 即可实现递归全局记录。
// 2. 使用 K extends keyof T ? never : K 限制 key 不能重复。
interface Chainable<T = {}> {
  option<K extends string, V>(key: K extends keyof T ? never : K, value: V): Chainable<Omit<T, K> & Record<K, V>>
  get(): T
}

declare const chainable: Chainable
let res = chainable.option('foo', 123).option('foo', 2)
