type StringToTuple<S extends string> = S extends `${infer T}${infer U}`
  ? [T, ...StringToTuple<U>]
  : []

type Test = StringToTuple<'assa'>
type T = 'affs' extends `${infer T}${D}${infer U}` ? U : false // 'fs'

export {}

type TTTT = 'a' extends `${infer L}${infer R}` ? true : false
type BBB = [1, 1, 1] extends [infer L, ...infer R] ? R : false
type BBB = [1, 1] extends [infer L, ...infer R] ? R : false
type BBB = [1] extends [infer L, ...infer R] ? R : false
