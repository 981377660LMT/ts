// 写一个

import { Add, Subtract } from './ParseQueryString'

type TupleSplit<T, N extends number, O extends readonly unknown[] = readonly []> = O['length'] extends N
  ? [O, T]
  : T extends readonly [infer F, ...infer R]
  ? TupleSplit<readonly [...R], N, readonly [...O, F]>
  : [O, T]
type StringSplit<S extends string, D extends string> = S extends `${infer F}${D}${infer R}` ? [F, ...StringSplit<R, D>] : [S]
type TakeFirst<T extends readonly unknown[], N extends number> = TupleSplit<T, N>[0]
type SkipFirst<T extends readonly unknown[], N extends number> = TupleSplit<T, N>[1]
type StringToTuple<S extends string, Result extends readonly unknown[] = []> = S extends `${infer F}${infer R}`
  ? StringToTuple<R, [...Result, F]>
  : Result
type TupleToString<T extends readonly unknown[], Result extends string = ''> = T extends readonly [infer F, ...infer R]
  ? TupleToString<R, `${Result}${F & string}`>
  : Result

type TupleSlice<T extends readonly unknown[], S extends number = 0, E extends number = T['length']> = TakeFirst<SkipFirst<T, S>, Subtract<E, S>>
type StringSlice<S extends string, start extends number = 0, end extends number = S['length']> = TupleToString<Slice<StringToTuple<S>, start, end>>

type TupleSplice<
  T extends readonly unknown[],
  start extends number = 0,
  deleteCount extends number = Subtract<T['length'], start>,
  items extends readonly unknown[] = []
> = TupleConcat<TupleConcat<TupleSlice<T, 0, start>, TupleSlice<T, Add<start, deleteCount> & number>>, items>
type StringSplice<
  T extends string,
  start extends number = 0,
  deleteCount extends number = Subtract<T['length'], start>,
  items extends readonly unknown[] = []
> = TupleToString<TupleSplice<StringToTuple<T>, start, deleteCount, items>>

type TupleConcat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U]
type TupleConcatArrayRecursively<T extends readonly unknown[][]> = T extends [infer First, ...infer Rest]
  ? First extends readonly unknown[]
    ? Rest extends readonly unknown[][]
      ? TupleConcat<First, TupleConcatArrayRecursively<Rest>>
      : []
    : []
  : []
type StringConcat<T extends string, U extends string> = `${T}${U}`
type StringConcatArrayRecursively<T extends string[]> = T extends [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends string[]
      ? StringConcat<First, StringConcatArrayRecursively<Rest>>
      : never
    : never
  : never

export type Split<T extends string | readonly unknown[], D extends unknown> = T extends readonly unknown[]
  ? TupleSplit<T, D & number>
  : StringSplit<T & string, D & string>
export type Slice<T extends string | readonly unknown[], start extends number = 0, end extends number = T['length']> = T extends readonly unknown[]
  ? TupleSlice<T, start, end>
  : StringSlice<T & string, start, end>
export type Splice<
  T extends string | readonly unknown[],
  start extends number = 0,
  deleteCount extends number = Subtract<T['length'], start>,
  items extends readonly unknown[] = []
> = T extends readonly unknown[] ? TupleSplice<T, start, deleteCount, items> : StringSplice<T & string, start, deleteCount, items>

// test

type Test = Split<'a,b,c', ','>
type Test2 = Split<'a=1&b=2&c=3&a=4', '&'>
type Test3 = Slice<'a,b,c', 1, 2>
type Test4 = Splice<'a,b,c', 1, 2, ['d', 'e']>
