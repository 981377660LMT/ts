// type ParseQueryString<Input extends string, Res extends Record<string, string> = {}> = Input extends `${infer Key}=${infer Value}&${infer Rest}`
//   ? ParseQueryString<Rest, Merge<Res, { [K in Key]: Value }>>
//   : Input extends `${infer Key}=${infer Value}`
//   ? Merge<Res, { [K in Key]: Value }>
//   : Res

// type Merge<First extends object, Second extends object> = {
//   [Key in keyof First | keyof Second]: Key extends keyof Second ? Second[Key] : Key extends keyof First ? First[Key] : never
// }

// type Test = ParseQueryString<'a=1&b=2&c=3&a=4'>

// a=1&b=2&c=3&d=4
// ->{
//   a:[1,4],
//   b:2,
//   c:3,
// }

import { IsEqual } from '../type-fest学习笔记/internal'

function parseQueryString<S extends string>(s: S): ParseQueryString<S> {
  const items = s.split('&')
  const record: Record<string, Set<string>> = {}
  items.forEach(item => {
    const [k, v] = item.split('=')
    if (!record[k]) record[k] = new Set()
    record[k].add(v)
  })

  const res: Record<string, string | string[]> = {}
  for (const [k, v] of Object.entries(record)) {
    if (v.size > 1) {
      res[k] = [...v]
    } else {
      res[k] = v.values().next().value
    }
  }

  return res as ParseQueryString<S>
}

export { parseQueryString }
export type { ParseQueryString }

export type Split<S extends string, Separator extends string> = S extends `${infer First}${Separator}${infer Rest}`
  ? [First, ...Split<Rest, Separator>]
  : [S]

export type Join<Arr extends unknown[], Separator extends string> = Arr extends [infer First, ...infer Rest]
  ? `${First & string}${Separator}${Join<Rest, Separator>}`
  : ''

/**
 * 解析单个键值对。
 * @example
 * ```ts
 * type TestEntry = Entry<'a=1'>  // {a:'1'}
 * ```
 */
export type ParseEntry<S extends string> = S extends `${infer Key}=${infer Value}` ? { [K in Key]: Value } : never

/**
 * 合并两个对象, 如果有相同的key, 则value为包含两个对象value的数组.
 * @example
 * ```ts
 * type TestMerge1 = MergeRecord<{a:1,b:2},{b:3,c:4}>  // {a:[1],b:[2,3],c:[4]}
 * type TestMerge2 = MergeRecord<{a:[1],b:2,c:3},{b:[3],c:4}>  // {a:[1],b:[2,3],c:[3,4]}
 * ```
 */
export type MergeRecord<Record1 extends Record<string, unknown>, Record2 extends Record<string, unknown>> = {
  [K in keyof Record1 | keyof Record2]: K extends keyof Record1
    ? K extends keyof Record2
      ? [...(Record1[K] extends unknown[] ? Record1[K] : [Record1[K]]), ...(Record2[K] extends unknown[] ? Record2[K] : [Record2[K]])]
      : Record1[K] extends unknown[]
      ? Record1[K]
      : [Record1[K]]
    : K extends keyof Record2
    ? Record2[K] extends unknown[]
      ? Record2[K]
      : [Record2[K]]
    : never
}

export type MergeRecordRecursively<Records extends Record<string, unknown>[]> = Records extends [infer First, ...infer Rest]
  ? First extends Record<string, unknown>
    ? Rest extends Record<string, unknown>[]
      ? MergeRecord<First, MergeRecordRecursively<Rest>>
      : never
    : never
  : {}

export type Flat<T extends unknown[], Depth extends number = 2e15> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Depth extends 0
      ? T
      : [...Flat<First>, ...Flat<Rest>]
    : [First, ...Flat<Rest>]
  : T

export type Includes<Arr extends unknown[], Item> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? true
    : Includes<Rest, Item>
  : false

export type BuildTuple<Length extends number, Result extends unknown[] = []> = Result['length'] extends Length
  ? Result
  : BuildTuple<Length, [...Result, unknown]>
export type Add<Num1 extends number, Num2 extends number> = [...BuildTuple<Num1>, ...BuildTuple<Num2>]['length']
export type Subtract<A extends number, B extends number> = BuildTuple<A> extends [...infer U, ...BuildTuple<B>] ? U['length'] : never

export type IndexOf<Arr extends unknown[], SearchElement extends unknown, FromIndex extends number = 0> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, SearchElement> extends true
    ? FromIndex
    : IndexOf<Rest, SearchElement, FromIndex extends 0 ? 1 : Add<FromIndex, 1>>
  : -1

export type LastIndexOf<Arr extends unknown[], SearchElement extends unknown, FromIndex extends number = Subtract<Arr['length'], 1>> = Arr extends [
  ...infer Rest,
  infer Last
]
  ? IsEqual<Last, SearchElement> extends true
    ? FromIndex
    : LastIndexOf<Rest, SearchElement, Subtract<FromIndex, 1>>
  : -1

/**
 * 递归去重数组.
 */
export type UniqueArray<Arr extends unknown[]> = Arr extends [...infer Rest, infer Last]
  ? Includes<Rest, Last> extends true
    ? UniqueArray<Rest>
    : [...UniqueArray<Rest>, Last]
  : Arr

type TestSplit = Split<'a=1&b=2&c=3&a=4', '&'>
type TestParseEntry = ParseEntry<'a=1'>
type TestUniqueArray = UniqueArray<[1, 2, 3, 4, 2, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]>
type TestIndexOf = IndexOf<[1, 1, 3, 4, 5, 6, 7, 8, 9, 0], 1>
type TestLastIndexOf = LastIndexOf<[1, 1, 1, 3, 4, 5, 6, 7, 8, 9, 0], 1>
type TestJoin = Join<['a', 'b', 'c', 'd'], '&'>
type TestMergeRecord = MergeRecord<{ a: []; b: 2; c: 3 }, { b: [3]; c: 4 }>
