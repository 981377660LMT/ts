// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>
]

// ============= Your Code Here =============
type AppendToObject<T, U extends PropertyKey, V> = Mapping<T & Record<U, V>>
type Mapping<T> = {
  [K in keyof T]: T[K]
}

interface ConfigSource {
  filter: string
  sorts: number
  groups: number
}

type Entry<T extends object, K extends keyof T = keyof T> = {
  key: K
  value: T[K]
}

let array: Entry<ConfigSource>[] = [
  { key: 'filter', value: BigInt(1) },
  { key: 'sorts', value: 2 },
  { key: 'groups', value: 3 }
]
